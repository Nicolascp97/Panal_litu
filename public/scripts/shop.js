// Scroll to products
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle QR Scan button
function handleScan() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const demoLotId = 'LIT-26-QUILLAY-001';
        window.location.href = `index.html?lot=${demoLotId}`;
    } else {
        alert('Para escanear el código QR, por favor usa la cámara de tu dispositivo móvil o ingresa manualmente el código del lote.');
    }
}

// Add to cart (placeholder)
function addToCart(productId) {
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('litu_cart') || '[]');

    // Add product
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    // Save cart
    localStorage.setItem('litu_cart', JSON.stringify(cart));

    // Show feedback
    alert('✅ Producto agregado al carrito');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
