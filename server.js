const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Import route handlers
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const searchRouter = require('./routes/search');
const faqRouter = require('./routes/faq');
const loginRouter = require('./routes/login');
const settingsRouter = require('./routes/settings');

// Set up view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Use route handlers
app.use('/', indexRouter); // Homepage route
app.use('/', aboutRouter); // About page route
app.use('/', searchRouter); // Search page route
app.use('/', faqRouter); // FAQ page route
app.use('/', loginRouter); // Login page route
app.use('/', settingsRouter); // Settings page route

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
