const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set up view engine to use EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (images, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to render homepage
app.get('/', (req, res) => {
  const products = [
    { name: 'Karenosaurus Rex', price: 4999.99, image: '1.jpg' },
    { name: 'The Witness', price: 2999.99, image: '2.jpg' },
    { name: 'Carnotadministrus', price: 1999.99, image: '3.jpg' }
  ];
  res.render('index', { products });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
