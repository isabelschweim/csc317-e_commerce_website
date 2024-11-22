const express = require('express');
const router = express.Router();

// Route to render homepage
router.get('/', (req, res) => {
  const products = [
    { name: 'Purranosaurus', price: 4999.99, image: '4.jpg' },
    { name: 'The Witness', price: 2999.99, image: '2.jpg' },
    { name: 'Carnotadministrus', price: 1999.99, image: '3.jpg' }
  ];
  res.render('index', { products });
});

module.exports = router;
