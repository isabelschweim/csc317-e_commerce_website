// databases/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to connect to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS Products (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  token TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 10
)`);

db.run(`CREATE TABLE IF NOT EXISTS Cart (
  user_id TEXT NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY(product_id) REFERENCES Products(id)
)`);

db.get("SELECT COUNT(*) AS count FROM Products", (err, row) => {
  if (row && row.count === 0) {
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Carnotadministrus','The dino for the small business tyrant. For those who have the grindset.',1999.99,'a1b2c3d4-e5f6-7890-abcd-ef1234567890')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Chappy','Feeling blue? Chappy is for you.',399.99,'f1e2d3c4-b5a6-7890-1234-56789abcdef0')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Chonkosaurus','Perfect reminder that you need to lose weight post-Thanksgiving.',10999.99,'1234abcd-5678-90ef-ghij-klmnopqrstuv')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Creepclaw','That one awkward dinosaur from your middle school.',1499.99,'abcd1234-ef56-7890-ghij-klmnopqrstuv')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Eleganteryx','For the lady gym-rats. Or gym-dinos.',1099.99,'yzab1234-cdef-ghij-klmn-opqrstuvw')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Gloomasaurus','A dino to remind you that things can always be worse.',449.99,'0987zyxw-vuts-rqpo-nmlk-jihgfedcba12')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Johnny-Raptor','Here''s Johnny!',32.99,'5678mnop-qrst-uvwx-yzab-cdefghijkl34')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Estilosaurus','Flash this dino when you need to speak with the manager.',7999.99,'abcd5678-efgh-ijkl-mnop-qrstuvwx9012')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Purranosaurus','A horrid science experiment gone wrong.',4999.99,'mnop1234-qrst-uvwx-yzab-cdefghijkl56')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('Rumoraptor','A DinoTube drama queen/king.',1949.99,'ijkl5678-mnop-qrst-uvwx-yzabcdef9012')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('T. Wrecks','The largest known creature to exist. Ever.',24999.99,'qrst1234-uvwx-yzab-cdef-ghijklmnop78')");
    db.run("INSERT INTO Products (title, description, price, token) VALUES ('The Witness','He saw it coming, but no one would listen to him. It was too late.',699.99,'uvwx5678-yzab-cdef-ghij-klmnopqrst90')");
  }
});

module.exports = db;
