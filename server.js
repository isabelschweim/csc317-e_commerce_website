const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establish a connection to the SQLite database using a relative path
const dbPath = path.join(__dirname, 'databases', 'products.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Import route handlers
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const searchRouter = require('./routes/search');
const searchApiRouter = require('./api/search');
const faqRouter = require('./routes/faq');
const loginRouter = require('./routes/login');
const settingsRouter = require('./routes/settings');
const authRouter = require('./routes/auth');  // Add this line
const cartRouter = require('./routes/cart');

// Set up view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Mount API routes first
app.use('/api', searchApiRouter);

// Serve static files (images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Use route handlers
app.use('/', indexRouter);      // Homepage route
app.use('/', aboutRouter);      // About page route
app.use('/', searchRouter);     // Search page route
app.use('/', faqRouter);        // FAQ page route
app.use('/', loginRouter);      // Login page route
app.use('/', settingsRouter);   // Settings page route
app.use('/', authRouter);       // Authentication routes
app.use('/', cartRouter);       // Cart page route

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});