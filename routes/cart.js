const express = require('express');
const router = express.Router();

// Route to render About page
router.get('/cart', (req, res) => {
  res.render('cart');
});

module.exports = router;
