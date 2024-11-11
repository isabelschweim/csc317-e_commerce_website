let bidButtonEl = document.getElementById("bid-btn");
// let priceEL = document.getElementById("price-el");

function bidPlaced(event) {
    let bidButtonEl = event.target;
    bidButtonEl.textContent = "Bid Placed!";
    bidButtonEl.style.backgroundColor = "#bc6c25";
}
bidButtonEl.addEventListener("click", bidPlaced);

// priceEl.addEventListener("click", priceIncrease());