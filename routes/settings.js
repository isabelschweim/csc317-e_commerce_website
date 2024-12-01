const express = require('express');
const router = express.Router();

// Route to render Settings page
router.get('/settings', (req, res) => {
  res.render('settings');
});

module.exports = router;