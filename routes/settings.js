// routes/settings.js
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

// Route to render Settings page
router.get('/settings', (req, res) => {
  console.log('Session userId:', req.session.userId); // for debugging

  if (!req.session.userId) {
      return res.render('settings', { 
          purchaseHistory: [],
          user: null,
          message: 'Please log in to view your purchase history'
      });
  }

    const db = getDb();
    
    // Fetch purchase history for logged-in user
    db.all(`
      SELECT n.*, p.purchase_date
      FROM purchases p
      JOIN NFTs n ON p.nft_id = n.id
      WHERE p.user_id = ?
      ORDER BY p.purchase_date DESC
  `, [req.session.userId], (err, purchases) => {
      if (err) {
          console.error('Error fetching purchase history:', err);
          db.close();
          return res.render('settings', { 
              purchaseHistory: [],
              error: 'Error fetching purchase history',
              user: { id: req.session.userId, username: req.session.username }
          });
      }

      res.render('settings', { 
          purchaseHistory: purchases || [],
          user: { id: req.session.userId, username: req.session.username }
      });
      db.close();
  });
});

module.exports = router;