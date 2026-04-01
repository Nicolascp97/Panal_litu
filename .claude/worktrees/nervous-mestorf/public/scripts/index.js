// Función para compartir el producto
function shareProduct() {
    if (navigator.share) {
        navigator.share({
            title: 'Miel de Lechuguilla - Litueche',
            text: 'Descubre esta miel premium con trazabilidad digital certificada',
            url: window.location.href
        }).catch(() => { });
    } else {
        // Fallback: copiar al portapapeles
        navigator.clipboard.writeText(window.location.href);
        alert('¡Link copiado al portapapeles!');
    }
}

// Get lot ID from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const lotId = urlParams.get('lot');
let currentLotData = null;

// Demo data (fallback)
const demoData = {
    lotId: "#LIT-25-LECH-001",
    harvestDate: "Temporada 2025",
    location: {
        farm: "Colmenar Litueche",
        region: "Litueche, Región del Libertador O'Higgins",
        coordinates: { lat: -34.1611, lng: -71.7689 }
    },
    variety: "LECHUGUILLA",
    beekeeper: {
        name: "Hermanos Olguín",
        story: "En los campos indómitos de Litueche, el tiempo se mide en floraciones y el silencio solo lo rompe el aleteo de nuestras abejas. Esta miel es un testimonio de respeto por la matriz de la vida, extraída con paciencia y honestidad.",
        generation: "3ra Generación · Secano Costero",
        territory: "Secano Costero"
    },
    tasting: {
        sommelierNotes: "Entrada suave con notas florales frescas y un toque herbáceo delicado. Dulzura equilibrada con final limpio y persistente, característico de la Lechuguilla endémica del secano costero de Litueche.",
        intensity: 75,
        sweetness: 65,
        texture: 80
    },
    blockchain: {
        network: "Base Network",
        contractAddress: "0xa3f8c2e1d4b7f9a0e5c8d2b1f4a7e0c3d6b9f2a5e8c1d4b7f0a3e6c9d2b5f8a1",
        verified: true
    },
    pricing: {
        amount: 9900,
        currency: "CLP",
        label: "Precio Lote Cero"
    },
    whatsapp: "56983665863"
};

// Load lot data
function loadLotData() {
    if (lotId) {
        const lots = JSON.parse(localStorage.getItem('litu_lots') || '[]');
        const lot = lots.find(l => l.lotId === lotId);

        if (lot) {
            currentLotData = lot;
            populatePageWithData(lot);
        } else {
            console.warn('Lot not found, using demo data');
            currentLotData = demoData;
            populatePageWithData(demoData);
        }
    } else {
        currentLotData = demoData;
        populatePageWithData(demoData);
    }
}

// Populate page with data
function populatePageWithData(data) {
    // Update title
    document.title = `Miel de ${data.variety} - Litueche, Chile`;

    // Update hero section
    const varietyLabel = document.getElementById('label-variedad');
    if (varietyLabel) varietyLabel.textContent = data.variety.charAt(0) + data.variety.slice(1).toLowerCase();

    // Update certificate tab
    document.querySelector('#tab-certificate .text-lg.font-serif').textContent = data.lotId;

    document.querySelectorAll('#tab-certificate .grid.grid-cols-2 .text-sm')[0].textContent = data.harvestDate;
    document.querySelectorAll('#tab-certificate .grid.grid-cols-2 .text-sm')[1].textContent = data.location.farm;

    document.querySelector('#tab-certificate .font-mono.text-\\[10px\\].text-slate-500.break-all').textContent = data.blockchain.contractAddress;

    // Update story tab
    document.querySelector('#tab-story .text-2xl.font-serif.text-white.mb-2').textContent = data.beekeeper.name;
    document.querySelector('#tab-story .text-slate-300.text-sm.leading-relaxed').textContent = data.beekeeper.story;
    // [0] = tarjeta Territorio → Secano Costero | [1] = tarjeta Apicultor → Hermanos Olguín
    document.querySelectorAll('#tab-story .grid.grid-cols-2 .text-sm.font-medium')[0].textContent = data.beekeeper.territory;
    document.querySelectorAll('#tab-story .grid.grid-cols-2 .text-sm.font-medium')[1].textContent = data.beekeeper.name;

    // Update metrics tab
    document.querySelector('#tab-metrics .italic.border-l-2').textContent = `"${data.tasting.sommelierNotes}"`;
    document.querySelectorAll('#tab-metrics .h-full.bg-amber-500')[0].style.width = data.tasting.intensity + '%';
    document.querySelectorAll('#tab-metrics .h-full.bg-amber-500')[1].style.width = data.tasting.sweetness + '%';
    document.querySelectorAll('#tab-metrics .h-full.bg-amber-500')[2].style.width = data.tasting.texture + '%';

    // Update pricing
    document.querySelector('.text-xl.font-serif.text-white').innerHTML = `$${data.pricing.amount.toLocaleString()} <span class="text-xs text-slate-500 font-sans font-normal">${data.pricing.currency}</span>`;
    document.querySelectorAll('.text-\\[9px\\].text-slate-600')[0].textContent = `Lote ${data.lotId}`;

    // Update WhatsApp button
    const buyButton = document.querySelector('button[onclick*="wa.me"]');
    if (buyButton) {
        const phone = data.whatsapp || "56983665863";
        const message = encodeURIComponent(`Hola! Vi la página de trazabilidad del Lote Cero y quiero reservar mi frasco de Miel de ${data.variety.charAt(0) + data.variety.slice(1).toLowerCase()} Panal de Litu. ¿Cómo coordino el pago y el envío?`);
        buyButton.setAttribute('onclick', `window.open('https://wa.me/${phone}?text=${message}', '_blank')`);
    }

    // Update share function
    window.shareProduct = function () {
        if (navigator.share) {
            navigator.share({
                title: `Miel de ${data.variety} - Litueche`,
                text: 'Descubre esta miel premium con trazabilidad digital certificada',
                url: window.location.href
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('¡Link copiado al portapapeles!');
        }
    };
}

// Simulación de carga blockchain + load data
setTimeout(() => {
    loadLotData();
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('content').classList.remove('hidden');
}, 2200);

// Variable para almacenar la instancia del mapa
let map = null;
let mapInitialized = false;

// Función para inicializar el mapa
function initMap() {
    if (mapInitialized) return;

    // Coordenadas dinámicas o fallback
    const coords = currentLotData ?
        [currentLotData.location.coordinates.lat, currentLotData.location.coordinates.lng] :
        [-34.1500, -71.7500];

    // Crear el mapa
    map = L.map('map', {
        center: coords,
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
        dragging: true,
        touchZoom: true
    });

    // Agregar capa de mapa (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18
    }).addTo(map);

    // Crear icono personalizado (honey-themed)
    const honeyIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="background: #f59e0b; width: 32px; height: 32px; border-radius: 50%; border: 3px solid #0f172a; box-shadow: 0 0 20px rgba(245, 158, 11, 0.6); display: flex; align-items: center; justify-content: center;">
            <svg style="width: 16px; height: 16px; color: #0f172a;" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
        </div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
    });

    const farmName = currentLotData ? currentLotData.location.farm : 'Fundo Sta. María';
    const region = currentLotData ? currentLotData.location.region : 'Litueche, Región de O\'Higgins';

    // Agregar marcador
    L.marker(coords, { icon: honeyIcon })
        .addTo(map)
        .bindPopup(`
            <div style="font-family: 'Inter', sans-serif; padding: 4px;">
                <strong style="color: #f59e0b; font-size: 14px;">${farmName}</strong><br>
                <span style="color: #cbd5e1; font-size: 12px;">${region}</span><br>
                <span style="color: #94a3b8; font-size: 11px;">Zona de producción verificada</span>
            </div>
        `)
        .openPopup();

    mapInitialized = true;

    // Forzar actualización del tamaño del mapa
    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}


// Función para cambiar de tab
function showTab(tabName) {
    // Ocultar todas las tabs
    document.getElementById('tab-certificate').classList.add('hidden');
    document.getElementById('tab-story').classList.add('hidden');
    document.getElementById('tab-metrics').classList.add('hidden');

    // Remover estilo activo de todos los botones
    document.getElementById('btn-certificate').className = 'flex-1 py-2 text-xs font-medium rounded-xl transition-all duration-300 text-slate-400 hover:text-white';
    document.getElementById('btn-story').className = 'flex-1 py-2 text-xs font-medium rounded-xl transition-all duration-300 text-slate-400 hover:text-white';
    document.getElementById('btn-metrics').className = 'flex-1 py-2 text-xs font-medium rounded-xl transition-all duration-300 text-slate-400 hover:text-white';

    // Mostrar tab seleccionada y activar botón
    document.getElementById('tab-' + tabName).classList.remove('hidden');
    document.getElementById('btn-' + tabName).className = 'flex-1 py-2 text-xs font-medium rounded-xl transition-all duration-300 bg-amber-500 text-slate-950 shadow-lg';

    // Inicializar mapa cuando se abre la tab de historia
    if (tabName === 'story') {
        setTimeout(initMap, 100);
        const vid = document.querySelector('#tab-story video');
        if (vid) vid.play().catch(() => { });
    }
}

// Función para toggle del modal
function toggleModal() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('hidden');
}
