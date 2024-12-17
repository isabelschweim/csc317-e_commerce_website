const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const session = require('express-session');
const fetch = require('node-fetch');
require('dotenv').config();  // Load environment variables from .env
const app = express();
const port = 3000;

// Middleware setup
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

// Function to check if email exists in Mailchimp list
const checkEmailExists = async (email) => {
    const response = await fetch(`https://us13.api.mailchimp.com/3.0/search-members?query=${email}`, {
        method: 'GET',
        headers: {
            Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`  // Use API key from .env
        }
    });

    const data = await response.json();
    return data.exact_matches.total_items > 0;
};

// Signup Route for Newsletter
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Check if all fields are filled
    if (!firstName || !lastName || !email) {
        return res.redirect('/newsletter/fail.html');  // Redirect to fail.html if fields are missing
    }

    // Check if email already exists in Mailchimp
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
        return res.redirect('/newsletter/emailExists.html');  // Redirect to emailExists.html if the email is already subscribed
    }

    // Construct data to add the new subscriber to Mailchimp
    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const postData = JSON.stringify(data);

    try {
        const response = await fetch(`https://us13.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}`, {  // Use List ID from .env
            method: 'POST',
            headers: {
                Authorization: `auth ${process.env.MAILCHIMP_API_KEY}`,  // Use API key from .env
                'Content-Type': 'application/json'
            },
            body: postData
        });

        if (response.status === 200) {
            return res.redirect('/newsletter/success.html');  // Redirect to success.html on successful subscription
        } else {
            return res.redirect('/newsletter/fail.html');  // Redirect to fail.html if there's an error
        }
    } catch (err) {
        console.error(err);
        return res.redirect('/newsletter/fail.html');  // Redirect to fail.html in case of error
    }
});
