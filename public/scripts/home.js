// Handle QR Scan button
function handleScan() {
    // Check if device has camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // For now, redirect to a demo lot
        // In production, this would open a QR scanner
        const demoLotId = 'LIT-26-QUILLAY-001';
        window.location.href = `index.html?lot=${demoLotId}`;
    } else {
        alert('Para escanear el código QR, por favor usa la cámara de tu dispositivo móvil o ingresa manualmente el código del lote.');
    }
}

// Handle Products button
function handleProducts() {
    window.location.href = 'shop.html';
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
