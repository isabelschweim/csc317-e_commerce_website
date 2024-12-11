const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Define the path to the database
const dbPath = path.join(__dirname, 'databases', 'products.sqlite');

// Ensure the databases directory exists
if (!fs.existsSync(path.join(__dirname, 'databases'))) {
    fs.mkdirSync(path.join(__dirname, 'databases'));
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
        console.log('Database created successfully.');
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS NFTs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        NFTtitle TEXT NOT NULL,
        NFTdescription TEXT NOT NULL,
        NFTprice REAL NOT NULL,
        NFTtoken TEXT NOT NULL
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created successfully.');
        }
    });

    const nfts = [
        ['Carnotadministrus', 'The NFT for the small business tyrant. For those who have the grindset.', 1999.99, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'],
        ['Chappy', 'Feeling blue? Chappy is for you.', 399.99, 'f1e2d3c4-b5a6-7890-1234-56789abcdef0'],
        ['Chonkosaurus', 'Perfect reminder that you need to lose weight post-Thanksgiving.', 10999.99, '1234abcd-5678-90ef-ghij-klmnopqrstuv'],
        ['Creepclaw', 'That one awkward dinosaur from your middle school.', 1499.99, 'abcd1234-ef56-7890-ghij-klmnopqrstuv'],
        ['Eleganteryx', 'For the lady gym-rats. Or gym-dinos.', 1099.99, 'yzab1234-cdef-ghij-klmn-opqrstuvw'],
        ['Gloomasaurus', 'A NFT to remind you that things can always be worse.', 449.99, '0987zyxw-vuts-rqpo-nmlk-jihgfedcba12'],
        ['Johnny-Raptor', 'Here\'s Johnny!', 32.99, '5678mnop-qrst-uvwx-yzab-cdefghijkl34'],
        ['Karenodon', 'Flash this NFT when you need to speak with the manager.', 7999.99, 'abcd5678-efgh-ijkl-mnop-qrstuvwx9012'],
        ['Purranosaurus', 'A horrid science experiment gone wrong.', 4999.99, 'mnop1234-qrst-uvwx-yzab-cdefghijkl56'],
        ['Rumoraptor', 'A DinoTube drama queen/king.', 1949.99, 'ijkl5678-mnop-qrst-uvwx-yzabcdef9012'],
        ['T. Wrecks', 'The largest known creature to exist. Ever.', 24999.99, 'qrst1234-uvwx-yzab-cdef-ghijklmnop78'],
        ['The Witness', 'He saw it coming, but no one would listen to him. It was too late.', 699.99, 'uvwx5678-yzab-cdef-ghij-klmnopqrst90']
    ];

    const insertStmt = db.prepare(`INSERT INTO NFTs (NFTtitle, NFTdescription, NFTprice, NFTtoken) VALUES (?, ?, ?, ?)`);
    nfts.forEach(nft => {
        insertStmt.run(nft, (err) => {
            if (err) {
                console.error('Error inserting data:', err.message);
            }
        });
    });
    insertStmt.finalize((err) => {
        if (err) {
            console.error('Error finalizing statement:', err.message);
        } else {
            console.log('Data inserted successfully.');
        }
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});