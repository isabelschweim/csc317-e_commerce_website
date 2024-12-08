const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(':memory:')

db.serialize(() => {
  db.run('CREATE TABLE products (id INTEGER PRIMARY KEY,
	                               title TEXT NOT NULL,
	                               description TEXT NOT NULL,
                              	 price REAL NOT NULL,
	                               token TEXT NOT NULL)')
  const stmt = db.prepare('INSERT INTO products VALUES ( ... )')

  for (let i = 0; i < 10; i++) {
    stmt.run(products ${i})
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM products', (err, row) => {
    console.log(${row.id}: ${row.info})
  })
})

db.close()
