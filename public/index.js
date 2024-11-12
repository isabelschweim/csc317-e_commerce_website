// index.js
document.addEventListener("DOMContentLoaded", function() {
    let bidButtons = document.querySelectorAll(".bid-btn");

    bidButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            let bidButtonEl = event.target;
            bidButtonEl.textContent = "Bid Placed!";
            bidButtonEl.style.backgroundColor = "#bc6c25";
        });
    });
});
