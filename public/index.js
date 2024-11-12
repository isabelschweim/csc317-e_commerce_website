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

// Get the button
let backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// When the user clicks the button, scroll to the top of the document
backToTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
};
