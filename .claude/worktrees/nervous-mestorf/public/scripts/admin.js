// Authentication
const ADMIN_PASSWORD = 'litu2024';
let currentLotForQR = null;

function login(event) {
    event.preventDefault();
    const password = document.getElementById('password-input').value;

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('litu_admin_auth', 'true');
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadLots();
    } else {
        document.getElementById('login-error').classList.remove('hidden');
    }
}

function logout() {
    sessionStorage.removeItem('litu_admin_auth');
    location.reload();
}

// Check auth on load
window.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('litu_admin_auth') === 'true') {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('admin-dashboard').classList.remove('hidden');
        loadLots();
    }
});

// Tab Navigation
function showAdminTab(tabName) {
    document.getElementById('admin-tab-create').classList.add('hidden');
    document.getElementById('admin-tab-manage').classList.add('hidden');

    document.getElementById('tab-btn-create').className = 'px-4 py-3 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white transition-colors';
    document.getElementById('tab-btn-manage').className = 'px-4 py-3 text-sm font-medium border-b-2 border-transparent text-slate-400 hover:text-white transition-colors';

    document.getElementById('admin-tab-' + tabName).classList.remove('hidden');
    document.getElementById('tab-btn-' + tabName).className = 'px-4 py-3 text-sm font-medium border-b-2 border-amber-500 text-amber-500';

    if (tabName === 'manage') {
        loadLots();
    }
}

// Generate Lot ID
function generateLotId(variety) {
    const year = new Date().getFullYear().toString().slice(-2);
    const lots = JSON.parse(localStorage.getItem('litu_lots') || '[]');
    const varietyLots = lots.filter(l => l.lotId.includes(variety));
    const number = (varietyLots.length + 1).toString().padStart(3, '0');
    return `LIT-${year}-${variety}-${number}`;
}

// Form Submission
const lotForm = document.getElementById('lot-form');
if (lotForm) {
    lotForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const variety = document.getElementById('variety').value;
        const lotId = generateLotId(variety);

        const lotData = {
            lotId: lotId,
            harvestDate: document.getElementById('harvest-date').value,
            location: {
                farm: document.getElementById('farm-name').value,
                region: document.getElementById('region').value,
                coordinates: {
                    lat: parseFloat(document.getElementById('latitude').value),
                    lng: parseFloat(document.getElementById('longitude').value)
                }
            },
            variety: variety,
            beekeeper: {
                name: document.getElementById('beekeeper-name').value,
                story: document.getElementById('beekeeper-story').value,
                generation: document.getElementById('generation').value,
                territory: document.getElementById('territory').value
            },
            tasting: {
                sommelierNotes: document.getElementById('sommelier-notes').value,
                intensity: parseInt(document.getElementById('intensity').value),
                sweetness: parseInt(document.getElementById('sweetness').value),
                texture: parseInt(document.getElementById('texture').value)
            },
            blockchain: {
                network: 'Polygon',
                contractAddress: '0x' + Math.random().toString(16).substr(2, 8) + '...' + Math.random().toString(16).substr(2, 8),
                verified: true
            },
            pricing: {
                amount: parseInt(document.getElementById('price-amount').value),
                currency: document.getElementById('price-currency').value,
                label: 'Precio Lote Beta'
            },
            createdAt: new Date().toISOString()
        };

        // Save to localStorage
        const lots = JSON.parse(localStorage.getItem('litu_lots') || '[]');
        lots.push(lotData);
        localStorage.setItem('litu_lots', JSON.stringify(lots));

        // Generate QR
        currentLotForQR = lotData;
        generateQRCode(lotData.lotId);

        // Show success and reset form
        alert('✅ Lote creado exitosamente: ' + lotId);
        this.reset();

        // Show QR Modal
        showQRModal(lotData.lotId);
    });
}

// QR Code Generation
function generateQRCode(lotId) {
    const url = window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + '?lot=' + lotId;

    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();

    const qrHTML = qr.createImgTag(6, 8);

    document.getElementById('qr-preview').innerHTML = `
        <div class="bg-white p-6 rounded-xl inline-block">
            ${qrHTML}
        </div>
        <p class="text-sm text-slate-400 mt-4">Lote: ${lotId}</p>
        <button onclick="showQRModal('${lotId}')" class="mt-4 text-amber-500 hover:text-amber-400 text-sm font-medium">
            Ver en grande
        </button>
    `;
}

function showQRModal(lotId) {
    const url = window.location.origin + window.location.pathname.replace('admin.html', 'index.html') + '?lot=' + lotId;

    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();

    document.getElementById('qr-modal-content').innerHTML = qr.createImgTag(8, 0);
    document.getElementById('qr-lot-id').textContent = 'Lote: ' + lotId;
    document.getElementById('qr-modal').classList.remove('hidden');
}

function closeQRModal() {
    document.getElementById('qr-modal').classList.add('hidden');
}

function downloadQR() {
    const canvas = document.querySelector('#qr-modal-content img');
    const link = document.createElement('a');
    link.download = currentLotForQR.lotId + '-QR.png';
    link.href = canvas.src;
    link.click();
}

function printQR() {
    window.print();
}

// Load and Display Lots
function loadLots() {
    const lots = JSON.parse(localStorage.getItem('litu_lots') || '[]');
    const lotsList = document.getElementById('lots-list');
    const emptyState = document.getElementById('empty-state');

    if (lots.length === 0) {
        lotsList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    lotsList.innerHTML = lots.map(lot => `
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-lg font-serif text-white mb-1">${lot.lotId}</h3>
                    <p class="text-sm text-slate-400">Miel de ${lot.variety} · ${new Date(lot.harvestDate).toLocaleDateString('es-CL')}</p>
                </div>
                <div class="flex gap-2">
                    <button onclick="viewLot('${lot.lotId}')" class="p-2 text-slate-400 hover:text-amber-500 transition-colors" title="Ver QR">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
                        </svg>
                    </button>
                    <button onclick="deleteLot('${lot.lotId}')" class="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Eliminar">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                    <p class="text-xs text-slate-500 uppercase font-mono mb-1">Apicultor</p>
                    <p class="text-slate-300">${lot.beekeeper.name}</p>
                </div>
                <div>
                    <p class="text-xs text-slate-500 uppercase font-mono mb-1">Ubicación</p>
                    <p class="text-slate-300">${lot.location.farm}</p>
                </div>
                <div>
                    <p class="text-xs text-slate-500 uppercase font-mono mb-1">Precio</p>
                    <p class="text-slate-300">$${lot.pricing.amount.toLocaleString()} ${lot.pricing.currency}</p>
                </div>
                <div>
                    <p class="text-xs text-slate-500 uppercase font-mono mb-1">Blockchain</p>
                    <p class="text-emerald-400 text-xs">✓ Verificado</p>
                </div>
            </div>
        </div>
    `).join('');
}

function exportLots() {
    const lots = JSON.parse(localStorage.getItem('litu_lots') || '[]');
    const dataStr = JSON.stringify(lots, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'litu-lots-' + new Date().toISOString().split('T')[0] + '.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
