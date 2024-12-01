const express = require('express');
const router = express.Router();

// Route to render Register page
router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;