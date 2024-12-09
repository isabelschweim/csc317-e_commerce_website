const express = require('express');
const router = express.Router();

// Route to render homepage
router.get('/', (req, res) => {
  const products = [
    { name: 'Carnotadministrus', price: 1999.99,description: "if other CSS selectors with higher specificity are targeting the .price element, they may override the font size. To ensure your font size rule is applied, you can increase the specificity of your selector by using a more specific one like:", image: 'Carnotadministrus.jpeg' },
    { name: 'Chappy', price: 2999.99,description: "if other CSS selectors with higher specificity are targeting the .price element, they may", image: 'Chappy.jpeg' },
    { name: 'Chonkosaurus', price: 2499.99, image: 'Chonkosaurus.jpeg' },
    { name: 'Creepclaw', price: 3599.99, image: 'Creepclaw.jpeg' },
    { name: 'Eleganteryx', price: 4599.99, image: 'Eleganteryx.jpeg' },
    { name: 'Gloomasaurus', price: 3999.99, image: 'Gloomasaurus.jpeg' },
    { name: 'Johnny-Raptor', price: 3299.99, image: 'Johnny-Raptor.jpeg' },
    { name: 'Karenodon', price: 2399.99, image: 'Karenodon.jpeg' },
    { name: 'Purranosaurus', price: 4999.99, image: 'Purranosaurus.jpeg' },
    { name: 'Rumoraptor', price: 2799.99, image: 'Rumoraptor.jpeg' },
    { name: 'T-Wrecks', price: 3199.99, image: 'T-Wrecks.jpeg' },
    { name: 'The Witness', price: 2999.99, image: 'The Witness.jpeg' }
  ];
  res.render('index', { products });
});

module.exports = router;
