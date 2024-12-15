const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

router.get('/api/search', (req, res) => {
  const searchTerm = req.query.q; // Get search query from URL parameter

  // Path to the SQLite database
  const dbPath = path.join(__dirname, '..', 'databases', 'products.sqlite');

  // Open database connection
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
	if (err) {
	  console.error('Error connecting to database:', err.message);
	  return res.status(500).json({ error: 'Database connection failed' });
	}

	// Prepare SQL query to search by title (case-insensitive)
	const query = `SELECT * FROM NFTs WHERE NFTtitle LIKE ?`;
	const searchParam = `%${searchTerm}%`; // % allows partial matches

	// Execute the search query
	db.all(query, [searchParam], (err, rows) => {
	  // Close the database connection
	  db.close((closeErr) => {
		if (closeErr) {
		  console.error('Error closing database:', closeErr.message);
		}

		if (err) {
		  console.error('Error executing search query:', err.message);
		  return res.status(500).json({ error: 'Search query failed' });
		}

		// Send search results as JSON
		res.json(rows);
	  });
	});
  });
});

module.exports = router;