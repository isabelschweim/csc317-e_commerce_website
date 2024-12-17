const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Define the path to the database
const dbDir = path.join(__dirname, 'databases');
const dbPath = path.join(dbDir, 'users.sqlite');

// Create the databases directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Remove the existing database file if it exists
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

// Create a new SQLite database and insert data
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Database created successfully at:', dbPath);
    }
});

db.serialize(() => {
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        real_name TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully.');
        }
    });

    // Create NFTs table
    db.run(`CREATE TABLE IF NOT EXISTS NFTs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        NFTtitle TEXT NOT NULL,
        NFTdescription TEXT NOT NULL,
        NFTprice REAL NOT NULL,
        NFTtoken TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating NFTs table:', err.message);
        } else {
            console.log('NFTs table created successfully.');
        }
    });


    db.run(`CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        nft_id INTEGER NOT NULL,
        date_added DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (nft_id) REFERENCES NFTs(id)
    )`);
    


    db.run(`CREATE TABLE IF NOT EXISTS purchases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        nft_id INTEGER NOT NULL,
        purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        purchase_price REAL NOT NULL,
        credit_card TEXT,
        ssn TEXT,
        mothers_maiden_name TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (nft_id) REFERENCES NFTs(id)
    )`, (err) => {
        if (err) {
            console.error('Error creating purchases table:', err.message);
        } else {
            console.log('Purchases table created successfully.');
        }
    });

    // Insert dummy users
    const users = [
        ['ronald', '1234', 'Roland McDonald'],
        ['rock', '1234', 'Dwayne Johnson'],
        ['spongebob', '1234', 'Mr. Squarepants'],
        ['tony', '1234', 'Tony Tiger'],
        ['bob', '1234', 'Bob Marley']
    ];

    const insertUserStmt = db.prepare('INSERT INTO users (username, password, real_name) VALUES (?, ?, ?)');
    users.forEach(user => {
        insertUserStmt.run(user, (err) => {
            if (err) {
                console.error('Error inserting user:', err.message);
            }
        });
    });
    insertUserStmt.finalize();

    // Insert NFT data
    const nfts = [
        ['Carnotadministrus', 'The NFT for the small business tyrant. For those who have the grindset.', 1999.99, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'],
        ['Chappy', 'Feeling blue? Chappy is for you.', 399.99, 'f1e2d3c4-b5a6-7890-1234-56789abcdef0'],
        ['Chonkosaurus', 'Perfect reminder that you need to lose weight post-Thanksgiving.', 10999.99, '1234abcd-5678-90ef-ghij-klmnopqrstuv'],
        ['Creepclaw', 'That one awkward dinosaur from your middle school.', 1499.99, 'abcd1234-ef56-7890-ghij-klmnopqrstuv'],
        ['Eleganteryx', 'For the lady gym-rats. Or gym-dinos.', 1099.99, 'yzab1234-cdef-ghij-klmn-opqrstuvw'],
        ['Gloomasaurus', 'A NFT to remind you that things can always be worse.', 449.99, '0987zyxw-vuts-rqpo-nmlk-jihgfedcba12'],
        ['Johnny-Raptor', 'Here\'s Johnny!', 32.99, '5678mnop-qrst-uvwx-yzab-cdefghijkl34'],
        ['Estilosaurus', 'Flash this NFT when you need to to get your hair done at a discount.', 7999.99, 'abcd5678-efgh-ijkl-mnop-qrstuvwx9012'],
        ['Purranosaurus', 'A horrid science experiment gone wrong.', 4999.99, 'mnop1234-qrst-uvwx-yzab-cdefghijkl56'],
        ['Rumoraptor', 'A DinoTube drama queen/king.', 1949.99, 'ijkl5678-mnop-qrst-uvwx-yzabcdef9012'],
        ['T. Wrecks', 'The largest known creature to exist. Ever.', 24999.99, 'qrst1234-uvwx-yzab-cdef-ghijklmnop78'],
        ['The Witness', 'He saw it coming, but no one would listen to him. It was too late.', 699.99, 'uvwx5678-yzab-cdef-ghij-klmnopqrst90']
    ];

    const insertNFTStmt = db.prepare('INSERT INTO NFTs (NFTtitle, NFTdescription, NFTprice, NFTtoken) VALUES (?, ?, ?, ?)');
    nfts.forEach(nft => {
        insertNFTStmt.run(nft, (err) => {
            if (err) {
                console.error('Error inserting NFT:', err.message);
            }
        });
    });
    insertNFTStmt.finalize();

    // Add some sample purchase data
    const samplePurchases = [
        [1, 3, 10999.99],  // Ronald buys Chonkosaurus
        [2, 7, 7999.99],   // Rock buys Karenodon
        [3, 11, 24999.99], // Spongebob buys T. Wrecks
    ];

    const insertPurchaseStmt = db.prepare('INSERT INTO purchases (user_id, nft_id, purchase_price) VALUES (?, ?, ?)');
    samplePurchases.forEach(purchase => {
        insertPurchaseStmt.run(purchase, (err) => {
            if (err) {
                console.error('Error inserting purchase:', err.message);
            }
        });
    });
    insertPurchaseStmt.finalize((err) => {
        if (err) {
            console.error('Error finalizing statements:', err.message);
        } else {
            console.log('All data inserted successfully.');
        }
    });
});
const samplePurchases = [
    [1, 3, 10999.99, '1234567890123456', '123-45-6789', 'Smith'],  // Ronald buys Chonkosaurus
    [2, 7, 7999.99, '9876543210987654', '987-65-4321', 'Johnson'],   // Rock buys Estilosaurus
    [3, 11, 24999.99, '1111222233334444', '111-22-3333', 'Squarepants'], // Spongebob buys T. Wrecks
];

const insertPurchaseStmt = db.prepare('INSERT INTO purchases (user_id, nft_id, purchase_price, credit_card, ssn, mothers_maiden_name) VALUES (?, ?, ?, ?, ?, ?)');
samplePurchases.forEach(purchase => {
    insertPurchaseStmt.run(purchase, (err) => {
        if (err) {
            console.error('Error inserting purchase:', err.message);
        }
    });
});
insertPurchaseStmt.finalize((err) => {
    if (err) {
        console.error('Error finalizing statements:', err.message);
    } else {
        console.log('All data inserted successfully.');
    }
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});

