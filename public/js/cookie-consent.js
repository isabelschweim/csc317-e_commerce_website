document.addEventListener('DOMContentLoaded', function () {
    const popupOverlay = document.getElementById('popupOverlay');
    const closePopup = document.getElementById('closePopup');

    function openPopup() {
        popupOverlay.style.display = 'block';
    }

    function closePopupFunc() {
        popupOverlay.style.display = 'none';
    }

    function acceptCookies() {
        console.log("User accepted cookies");
        // Here you could set a cookie to remember user's preference
        closePopupFunc();
    }

    function declineCookies() {
        console.log("User declined cookies");
        // Here you could set a cookie to remember user's preference
        closePopupFunc();
    }

    // Open popup on load
    openPopup();

    // Close popup when close (x) is clicked
    closePopup.addEventListener('click', closePopupFunc);

    // Close popup when clicking outside the popup content
    popupOverlay.addEventListener('click', function (event) {
        if (event.target === popupOverlay) {
            closePopupFunc();
        }
    });

    // Expose functions so they can be called from the HTML buttons
    window.acceptCookies = acceptCookies;
    window.declineCookies = declineCookies;
});
