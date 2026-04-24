// Base de datos de artistas (simulada)
const artists = [
    {
        name: "Elena Rivers",
        role: "Ilustradora Digital",
        category: "Digital",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
        workSample: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Marc Voller",
        role: "Artista 3D",
        category: "3D",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
        workSample: "https://images.unsplash.com/photo-1633519967262-e61184a43b4f?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Sofia Chen",
        role: "Diseñadora Gráfica",
        category: "Diseño",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
        workSample: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600"
    },

    {
        name: "Julian Karr",
        role: "Pintor Tradicional",
        category: "Tradicional",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
        workSample: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600"
    },
    {
        name: "Anya Smith",
        role: "Concept Artist",
        category: "Digital",
        photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
        workSample: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=600"
    }
];

// Función para inicializar iconos
function initIcons() {
    lucide.createIcons();
}

// Función para renderizar artistas
function renderArtists(filter = 'all') {
    const gallery = document.getElementById('artist-gallery');
    gallery.innerHTML = '';

    const filteredArtists = filter === 'all' 
        ? artists 
        : artists.filter(a => a.category === filter);

    if (filteredArtists.length === 0) {
        gallery.innerHTML = `
            <div class="empty-state">
                <p>No hay artistas en esta categoría aún.</p>
            </div>
        `;
        return;
    }

    filteredArtists.forEach(artist => {
        const card = document.createElement('div');
        card.className = 'artist-card';
        card.innerHTML = `
            <div class="work-sample-bg" style="background-image: url('${artist.workSample}')"></div>
            <div class="card-overlay">
                <div class="artist-info">
                    <img src="${artist.photo}" alt="${artist.name}" class="artist-photo">
                    <div class="artist-details">
                        <h3>${artist.name}</h3>
                        <p>${artist.role}</p>
                    </div>
                </div>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// Lógica de Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderArtists(e.target.dataset.filter);
    });
});

// Modal
const modal = document.getElementById('uploadModal');
function openModal() { modal.style.display = 'flex'; }
function closeModal() { modal.style.display = 'none'; }

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderArtists();
    initIcons();

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
});

const openModalBtn = document.querySelector('.nav-actions .btn-gradient');

openModalBtn.addEventListener('click', openModal);