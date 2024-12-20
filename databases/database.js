const sqlite3 = require('sqlite3').verbose()
const path = require('path');

// Attempt to connect to the database
const db = new sqlite3.Database(path.join(__dirname, 'products.db'), (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// If database does not already exist, Create new database
const db = new sqlite3.Database(':memory:')
db.serialize(() => {
  db.run('CREATE TABLE products (id INTEGER PRIMARY KEY,
	                               title TEXT NOT NULL,
	                               description TEXT NOT NULL,
                              	       price REAL NOT NULL,
	                               token TEXT NOT NULL)')
  const stmt = db.prepare( INSERT INTO products VALUES (1,'Carnotadministrus', 'The dino for the small business tyrant. For those who have the grindset. ', 1999.99, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');
                           INSERT INTO products VALUES (2,'Chappy', 'Feeling blue? Chappy is for you.', 399.99, 'f1e2d3c4-b5a6-7890-1234-56789abcdef0');
                           INSERT INTO products VALUES (3,'Chonkosaurus', 'Perfect reminder that you need to lose weight post-Thanksgiving.', 10999.99, '1234abcd-5678-90ef-ghij-klmnopqrstuv');
                           INSERT INTO products VALUES (4,'Creepclaw', 'That one awkward dinosaur from your middle school. ', 1499.99, 'abcd1234-ef56-7890-ghij-klmnopqrstuv');
                           INSERT INTO products VALUES (5,'Eleganteryx', 'For the lady gym-rats. Or gym-dinos.', 1099.99, 'yzab1234-cdef-ghij-klmn-opqrstuvw');
                           INSERT INTO products VALUES (6,'Gloomasaurus', 'A dino to remind you that things can always be worse.', 449.99, '0987zyxw-vuts-rqpo-nmlk-jihgfedcba12');
                           INSERT INTO products VALUES (7,'Johnny-Raptor', "Here's Johnny!", 32.99, '5678mnop-qrst-uvwx-yzab-cdefghijkl34');
                           INSERT INTO products VALUES (8,'Estilosaurus', 'Flash this dino when you need to speak with the manager.', 7999.99, 'abcd5678-efgh-ijkl-mnop-qrstuvwx9012');
                           INSERT INTO products VALUES (9,'Purranosaurus', 'A horrid science experiment gone wrong.', 4999.99, 'mnop1234-qrst-uvwx-yzab-cdefghijkl56');
                           INSERT INTO products VALUES (10,'Rumoraptor', "A DinoTube drama queen/king.", 1949.99, 'ijkl5678-mnop-qrst-uvwx-yzabcdef9012');
                           INSERT INTO products VALUES (11,'T. Wrecks', 'The largest known creature to exist. Ever. ', 24999.99, 'qrst1234-uvwx-yzab-cdef-ghijklmnop78');
                           INSERT INTO products VALUES (12,'The Witness', 'He saw it coming, but no one would listen to him. It was too late.', 699.99, 'uvwx5678-yzab-cdef-ghij-klmnopqrst90');
)

  for (let i = 0; i < 10; i++) {
    stmt.run(products ${i})
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM products', (err, row) => {
    console.log(${row.id}: ${row.info})
  })
})
module.exports = db;
db.close()
