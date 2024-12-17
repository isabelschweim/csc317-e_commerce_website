const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

function getDb() {
    return new sqlite3.Database(
        path.join(__dirname, '..', 'databases', 'users.sqlite'),
        sqlite3.OPEN_READWRITE
    );
}

router.get('/checkout', (req, res) => {
    if (!req.session?.userId) {
        return res.redirect('/login');
    }

    const db = getDb();
    
    db.all(`
        SELECT n.*, c.id as cart_id
        FROM cart c
        JOIN NFTs n ON c.nft_id = n.id
        WHERE c.user_id = ?
    `, [req.session.userId], (err, cartItems) => {
        if (err) {
            console.error('Error fetching cart:', err);
            db.close();
            return res.render('checkout', { 
                cartItems: [], 
                total: 0,
                error: 'Error fetching cart items'
            });
        }

        const total = cartItems.reduce((sum, item) => sum + item.NFTprice, 0);
        
        db.close();
        res.render('checkout', { 
            cartItems,
            total: total.toFixed(2)
        });
    });
});

router.post('/checkout', async (req, res) => {
    console.log('Checkout initiated:', req.session?.userId); // Debug log

    if (!req.session?.userId) {
        return res.status(401).json({ error: 'Please log in to complete checkout' });
    }

    const { creditCard, ssn, mothersMaidenName } = req.body;
    
    if (!creditCard || !ssn || !mothersMaidenName) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const db = getDb();

    try {
        // Get cart items first
        db.all('SELECT nft_id FROM cart WHERE user_id = ?', [req.session.userId], (err, cartItems) => {
            if (err) {
                console.error('Error fetching cart items:', err);
                db.close();
                return res.status(500).json({ error: 'Error fetching cart items' });
            }

            if (!cartItems || cartItems.length === 0) {
                db.close();
                return res.status(400).json({ error: 'Cart is empty' });
            }

            // Begin transaction
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');

                try {
                    // Insert each purchase
                    const stmt = db.prepare(`
                        INSERT INTO purchases (user_id, nft_id, credit_card, ssn, mothers_maiden_name)
                        VALUES (?, ?, ?, ?, ?)
                    `);

                    cartItems.forEach(item => {
                        stmt.run([
                            req.session.userId,
                            item.nft_id,
                            creditCard,
                            ssn,
                            mothersMaidenName
                        ], (err) => {
                            if (err) {
                                console.error('Error inserting purchase:', err);
                                throw err;
                            }
                        });
                    });

                    stmt.finalize();

                    // Clear cart
                    db.run('DELETE FROM cart WHERE user_id = ?', [req.session.userId], (err) => {
                        if (err) {
                            console.error('Error clearing cart:', err);
                            throw err;
                        }

                        db.run('COMMIT', (err) => {
                            if (err) {
                                console.error('Error committing transaction:', err);
                                throw err;
                            }

                            db.close();
                            res.json({ success: true, message: 'Purchase successful!' });
                        });
                    });
                } catch (error) {
                    console.error('Transaction error:', error);
                    db.run('ROLLBACK');
                    db.close();
                    res.status(500).json({ error: 'Error processing purchase' });
                }
            });
        });
    } catch (error) {
        console.error('Checkout error:', error);
        if (db) db.close();
        res.status(500).json({ error: 'Error processing checkout' });
    }
});

module.exports = router;