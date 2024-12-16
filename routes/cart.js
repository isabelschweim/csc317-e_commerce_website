const express = require('express');
const router = express.Router();

// Sample cart items (You can replace this with dynamic data)
const cartItems = [
    { id: 1, name: "NFT Item 1", price: 100, image: "/images/nft-item1.png" },
    { id: 2, name: "NFT Item 2", price: 150, image: "/images/nft-item2.png" },
    { id: 3, name: "NFT Item 3", price: 200, image: "/images/nft-item3.png" },
];

// Route to display the cart
router.get('/cart', (req, res) => {
    res.render('cart', { cartItems });
});

module.exports = router;
