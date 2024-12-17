const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const app = express();
const port = 3000;

// Middleware setup (remove duplicates)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Add session data to views
app.use((req, res, next) => {
    res.locals.userId = req.session?.userId;
    res.locals.username = req.session?.username;
    next();
});

// Database connection
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
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');
const purchaseRouter = require('./routes/purchase');
const cartApiRouter = require('./api/cart');
const checkoutRouter = require('./routes/checkout');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api', searchApiRouter);
app.use('/api/cart', cartApiRouter);

// Page routes (only declare once)
app.use('/', indexRouter);
app.use('/', aboutRouter);
app.use('/', searchRouter);
app.use('/', faqRouter);
app.use('/', loginRouter);
app.use('/', settingsRouter);
app.use('/', authRouter);
app.use('/', cartRouter);
app.use('/', purchaseRouter);
app.use('/', checkoutRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});