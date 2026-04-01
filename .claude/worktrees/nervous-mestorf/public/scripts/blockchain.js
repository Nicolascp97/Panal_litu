// Flip card functionality
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Go back function
function goBack() {
    // Check if there's a referrer
    if (document.referrer && document.referrer.includes(window.location.hostname)) {
        window.history.back();
    } else {
        // Default to shop page
        window.location.href = 'shop.html';
    }
}
