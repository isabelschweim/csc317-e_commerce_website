// Sample cart items, you can fetch these from the backend.
const cartItems = [
    { id: 1, name: "NFT Item 1", price: 100, image: "/images/nft-item1.png" },
    { id: 2, name: "NFT Item 2", price: 150, image: "/images/nft-item2.png" },
    { id: 3, name: "NFT Item 3", price: 200, image: "/images/nft-item3.png" },
];

// Function to remove an item
function removeItem(itemId) {
    const cartContainer = document.querySelector('.cart-container');
    const itemElement = document.querySelector(`.cart-item[data-id="${itemId}"]`);
    
    if (itemElement) {
        // Remove the item from the DOM
        itemElement.remove();

        // Update the total price
        const updatedTotal = updateTotalPrice();
        document.querySelector('.cart-summary h3').textContent = `Total: $${updatedTotal}`;
    }
}

// Function to update the total price
function updateTotalPrice() {
    const remainingItems = document.querySelectorAll('.cart-item');
    let total = 0;

    remainingItems.forEach(item => {
        const price = parseFloat(item.querySelector('.cart-item-details p').textContent.replace('Price: $', ''));
        total += price;
    });

    return total;
}
