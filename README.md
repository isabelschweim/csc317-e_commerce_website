# csc317-e_commerce_website

# Team name
Bored Dinosaurs

# Members:
* Tony Wu
* Ryan Alvarado
* Steven Peralta
* Isabel Schweim

Our store sells rare dinosaur NFTs. Very valuable NFTs.
You can purchase from our curated selection of non-fungible tokens from our homepage and once checkout is complete, you’ll be provided unique keys to add to your digital wallet.

# dependencies
* npm install
* npm install express-session
* npm install bcrypt express-json
* npm install node-fetch@2
* npm install dotenv

# Project Structure 
<pre>
csc317-e_commerce_website/
│
├── README.md                       # Project overview or documentation
├── package-lock.json               # Contains the exact version of dependencies
├── package.json                    # Contains metadata about the project and its dependencies
├── server.js                       # Main entry point for the Express.js server
│
├── api                             # API-related files
│   ├── search.js                   # API endpoint for searching
│   └── testingSearch.js            # Testing for the search API
│
├── databases                       # Database-related files
│   ├── createProductsDatabase.js   # Script to create the products database
│   ├── createUserDatabase.js       # Script to create the user database
│   ├── database.js                 # Database connection and utility functions
│   ├── note.txt                    # A text file (possibly for notes or documentation)
│   ├── products.db                 # SQLite database file for products
│   ├── products.sqlite             # SQLite database file (another format of products.db)
│   └── users.sqlite                # SQLite database file for users
│
├── public                          # Publicly accessible assets like CSS, images, and JS
│   ├── css                         # Stylesheets for the website
│   │   ├── about.css               # Styles for the About page
│   │   ├── cart.css                # Styles for the Cart page
│   │   ├── faq.css                 # Styles for the FAQ page
│   │   ├── index.css               # Styles for the homepage
│   │   ├── login.css               # Styles for the Login page
│   │   ├── search.css              # Styles for the Search page
│   │   ├── settings.css            # Styles for the Settings page
│   │   └── style.css               # Main stylesheet for the entire site
│   │
│   ├── images                       # Image assets for the website
│   │   ├── Header_Background.png   # Header background image
│   │   ├── Logo.png                # Logo image
│   │   ├── back_to_top.png         # Image for a "back to top" button
│   │   ├── my-cart.png             # Image for a shopping cart
│   │   └── qr-code.png             # QR code image
│   │
│   └── js                           # JavaScript files for client-side functionality
│       ├── auth.js                 # JavaScript file for authentication
│       ├── main.js                 # Main JavaScript file with client-side functions
│       └── search.js               # JavaScript file for search functionality
│
├── routes                          # Route handlers for different pages of the website
│   ├── about.js                    # Route handler for the About page
│   ├── auth.js                     # Route handler for authentication-related endpoints
│   ├── cart.js                     # Route handler for the Cart page
│   ├── faq.js                      # Route handler for the FAQ page
│   ├── index.js                    # Route handler for the homepage
│   ├── login.js                    # Route handler for the Login page
│   ├── search.js                   # Route handler for the Search page
│   └── settings.js                 # Route handler for the Settings page
│
└── views                           # EJS templates for rendering dynamic HTML
    ├── about.ejs                   # EJS template for the About page
    ├── cart.ejs                    # EJS template for the Cart page
    ├── faq.ejs                     # EJS template for the FAQ page
    ├── index.ejs                   # EJS template for the homepage
    ├── login.ejs                   # EJS template for the Login page
    ├── search.ejs                  # EJS template for the Search page
    └── settings.ejs                # EJS template for the Settings page
</pre>


# 1. Views Folder and EJS Files

The **views** folder contains HTML templates used by the server to render dynamic pages. These templates are written using **EJS (Embedded JavaScript)**, which allows JavaScript code to be embedded directly within HTML. 

For example, in a file like `index.ejs`, you can insert dynamic data using `<%= variable %>` to display things like dates, user information, or lists. When the server processes the request, it fills in these placeholders with the appropriate data and sends the rendered HTML back to the client.

EJS enables the creation of dynamic, data-driven pages while keeping the HTML structure and JavaScript logic separate.

# 2. Routes Folder and JS files

The **routes** folder contains files that define how the server handles different requests (like when a user visits a specific page). Each file in the folder represents a different set of routes for a specific page or feature of the application.

For example:
- `index.js` handles the homepage routes.
- `about.js` manages routes for the About page.
- Other files like `search.js`, `faq.js`, `login.js`, and `settings.js` define routes for their respective pages.

These route files are imported into `server.js` and used to respond to the user's requests for different pages. They help organize the app's routes in separate files for clarity and better maintainability.

# 3. `server.js`

**Imports**:
   - `express`: Framework used to build the web server. 

     ```javascript
     const express = require('express');
     ```
   - `path`: Module for handling file paths. It helps in working with directories and files in a platform-independent way, like joining folder paths.

     ```javascript
     const path = require('path');
     ```

**Setup**:
   - `app` is created as an instance of Express. This is the core object that handles requests and responses, making it the main part of the server.

     ```javascript
     const app = express();
     ```
   - The server listens on port `3000`. This means the web application will be accessible at `http://localhost:3000` on the browser.

     ```javascript
     const port = 3000;
     app.listen(port, () => {
       console.log(`Server running on http://localhost:${port}`);
     });
     ```

**View Engine**:
   - Uses `EJS` (Embedded JavaScript) as the templating engine. EJS allows the our website to generate dynamic HTML content by embedding JavaScript logic in HTML templates.

     ```javascript
     app.set('view engine', 'ejs');
     ```
   - The views are stored in the `views` folder. This folder contains all the EJS templates that will be rendered to the client when requested (e.g., `index.ejs`, `about.ejs`).

     ```javascript
     app.set('views', path.join(__dirname, 'views'));
     ```

**Static Files**:
   - `express.static()` serves static files like images, CSS, and JavaScript from the `public` directory. Any files (such as stylesheets or images) placed in the `public` folder are directly accessible by the browser.

     ```javascript
     app.use(express.static(path.join(__dirname, 'public')));
     ```

**Route Handlers**:
   - Route handlers are imported and used for different pages:
     - `indexRouter`: Homepage route. Handles requests to the homepage (e.g., `GET /`).

       ```javascript
       const indexRouter = require('./routes/index');
       app.use('/', indexRouter);
       ```
     - `aboutRouter`: About page route. Handles requests to the About page (e.g., `GET /about`).

       ```javascript
       const aboutRouter = require('./routes/about');
       app.use('/', aboutRouter);
       ```
     - `searchRouter`: Search page route. Handles requests for search functionality (e.g., `GET /search`).

       ```javascript
       const searchRouter = require('./routes/search');
       app.use('/', searchRouter);
       ```
     - `faqRouter`: FAQ page route. Handles requests to display frequently asked questions (e.g., `GET /faq`).

       ```javascript
       const faqRouter = require('./routes/faq');
       app.use('/', faqRouter);
       ```
     - `loginRouter`: Login page route. Handles user login requests (e.g., `GET /login`).

       ```javascript
       const loginRouter = require('./routes/login');
       app.use('/', loginRouter);
       ```
     - `settingsRouter`: Settings page route. Handles requests to access the settings page (e.g., `GET /settings`).

       ```javascript
       const settingsRouter = require('./routes/settings');
       app.use('/', settingsRouter);
       ```

**Server Start**:
   - The server is started using `app.listen()`, and it listens on `http://localhost:3000`. This means the web server is now running and will handle incoming requests on that port.

     ```javascript
     app.listen(port, () => {
       console.log(`Server running on http://localhost:${port}`);
     });
     ```
