// Ensure that the DOM is fully loaded before running any scripts
document.addEventListener("DOMContentLoaded", function() {
    // Bid button functionality
    let bidButtons = document.querySelectorAll(".add-to-cart-btn");

    bidButtons.forEach(button => {
        button.addEventListener("click", function(event) {
            let bidButtonEl = event.target;
            bidButtonEl.textContent = "Added!";
            bidButtonEl.style.background = "linear-gradient(to bottom, #46ae4b 0%, #2f7c33 100%)";
        });
    });

    // Back to top button functionality
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
});
