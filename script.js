const ARTISTS = [
  { id: 1, name: 'Camila Restrepo', handle: '@camila.ilustra', city: 'Medellín, CO', cat: 'ilustracion', available: true, likes: 341, title: 'Jardín de sombras', desc: 'Serie de ilustraciones editoriales explorando la dicotomía entre la belleza natural y la melancolía urbana.', tags: ['Editorial', 'Acuarela digital', 'Serie'], colors: ['#7C3AED', '#A78BFA', '#EDE9FE'], size: 'tall' },
  { id: 2, name: 'Andrés Villamizar', handle: '@andres.motion', city: 'Bogotá, CO', cat: 'animacion', available: true, likes: 512, title: 'Loop infinito', desc: 'Piezas de motion design generativas que exploran el movimiento como lenguaje visual autónomo.', tags: ['Motion', 'Loop', 'Generativo'], colors: ['#0369A1', '#0EA5E9', '#E0F2FE'], size: 'normal' },
  { id: 3, name: 'Sofía Mendoza', handle: '@sofia.concept', city: 'Ciudad de México, MX', cat: 'concept', available: false, likes: 289, title: 'Mundos fragmentados', desc: 'Concept art para videojuegos indie, ambientado en civilizaciones pos-colapso.', tags: ['Videojuegos', 'Sci-fi', 'Environment'], colors: ['#EC4899', '#F472B6', '#FDE7F3'], size: 'wide' },
  { id: 4, name: 'Juan Córdoba', handle: '@juan.conceptart', city: 'Cali, CO', cat: 'concept', available: true, likes: 198, title: 'Bestias del abismo', desc: 'Diseño de criaturas marinas fantásticas para producción audiovisual.', tags: ['Creature design', 'Fantasy', 'Dark'], colors: ['#059669', '#34D399', '#D1FAE5'], size: 'normal' },
  { id: 5, name: 'María López', handle: '@maria.brand', city: 'Lima, PE', cat: 'diseno', available: true, likes: 407, title: 'Sistema de identidad Noma', desc: 'Identidad visual completa para estudio de arquitectura boutique: símbolo, tipografía y paleta.', tags: ['Branding', 'Identidad', 'Tipografía'], colors: ['#F59E0B', '#FDE68A', '#FFFBEB'], size: 'tall' },
  { id: 6, name: 'Tomás Bravo', handle: '@tomas.2d', city: 'Santiago, CL', cat: 'animacion', available: true, likes: 633, title: 'Animación 2D — Niebla', desc: 'Cortometraje animado de 90 segundos sobre memoria y pérdida, producido en 2024.', tags: ['2D', 'Cortometraje', 'Narrativa'], colors: ['#5B21B6', '#7C3AED', '#C4B5FD'], size: 'normal' },
  { id: 7, name: 'Valentina Cruz', handle: '@valentina.ink', city: 'Buenos Aires, AR', cat: 'ilustracion', available: false, likes: 221, title: 'Cuerpos en tinta', desc: 'Exploración figurativa con tinta china y textura digital. Influencias de la ilustración japonesa contemporánea.', tags: ['Figurativo', 'Tinta', 'Japón'], colors: ['#B45309', '#F59E0B', '#FEF3C7'], size: 'normal' },
  { id: 8, name: 'Diego Paredes', handle: '@diego.ux', city: 'Medellín, CO', cat: 'diseno', available: true, likes: 310, title: 'UI kit Ambar', desc: 'Sistema de componentes de interfaz para aplicaciones de finanzas personales, con 240+ componentes.', tags: ['UI', 'Sistema', 'Finanzas'], colors: ['#0284C7', '#38BDF8', '#BAE6FD'], size: 'wide' },
  { id: 9, name: 'Isabela Moreira', handle: '@isabela.arte', city: 'São Paulo, BR', cat: 'ilustracion', available: true, likes: 478, title: 'Flora fantástica', desc: 'Ilustraciones botánicas de flora imaginaria, combinando rigor científico y fantasía surrealista.', tags: ['Botánica', 'Surrealismo', 'Color'], colors: ['#065F46', '#10B981', '#D1FAE5'], size: 'tall' },
  { id: 10, name: 'Mateo Serna', handle: '@mateo.branding', city: 'Bogotá, CO', cat: 'diseno', available: true, likes: 392, title: 'Rebrand Cafés del Eje', desc: 'Rebranding completo para cadena de cafeterías de especialidad. Incluye packaging, señalética y digital.', tags: ['Packaging', 'Retail', 'Café'], colors: ['#92400E', '#D97706', '#FEF3C7'], size: 'normal' },
  { id: 11, name: 'Laura Ospina', handle: '@laura.motion', city: 'Pereira, CO', cat: 'animacion', available: false, likes: 267, title: 'After — Transiciones', desc: 'Serie de transiciones y efectos de motion design para streamers y creadores de contenido.', tags: ['Streaming', 'Efectos', 'After Effects'], colors: ['#7C3AED', '#EC4899', '#FDF2F8'], size: 'normal' },
  { id: 12, name: 'Sebastián Roa', handle: '@seba.environments', city: 'Cali, CO', cat: 'concept', available: true, likes: 549, title: 'Ciudades perdidas', desc: 'Ilustraciones de entornos para worldbuilding: ciudades subterráneas, arquitecturas alienígenas y paisajes.', tags: ['Environment', 'Worldbuilding', 'Arquitectura'], colors: ['#1E3A5F', '#1D4ED8', '#DBEAFE'], size: 'wide' },
  { id: 13, name: 'Mariana Peña', handle: '@mariana.color', city: 'Medellín, CO', cat: 'ilustracion', available: true, likes: 183, title: 'Retratos del alma', desc: 'Retratos expresionistas digitales con paletas de color limitadas y pinceladas gestual.', tags: ['Retrato', 'Expresionismo', 'Color'], colors: ['#BE185D', '#EC4899', '#FCE7F3'], size: 'normal' },
  { id: 14, name: 'Felipe Arango', handle: '@felipe.3d', city: 'Medellín, CO', cat: 'animacion', available: true, likes: 701, title: 'Renders volumétricos', desc: 'Exploración de formas tridimensionales, luz y materiales con renders artísticos en Blender.', tags: ['3D', 'Blender', 'Volumen'], colors: ['#374151', '#9CA3AF', '#F3F4F6'], size: 'tall' },
  { id: 15, name: 'Carolina Gómez', handle: '@caro.brand', city: 'Bogotá, CO', cat: 'diseno', available: false, likes: 294, title: 'Identidad Estudio Norte', desc: 'Identidad visual minimalista para estudio de diseño interior escandinavo basado en Bogotá.', tags: ['Minimalismo', 'Interior', 'Escandinavo'], colors: ['#0F766E', '#14B8A6', '#CCFBF1'], size: 'normal' },
  { id: 16, name: 'Ricardo Salazar', handle: '@ricky.concept', city: 'Lima, PE', cat: 'concept', available: true, likes: 415, title: 'Armaduras del futuro', desc: 'Concept art de indumentaria y exoesqueletos para una franquicia de ciencia ficción.', tags: ['Sci-fi', 'Armadura', 'Diseño de personajes'], colors: ['#4338CA', '#818CF8', '#EEF2FF'], size: 'normal' },
  { id: 17, name: 'Natalia Hurtado', handle: '@nati.ilustra', city: 'Cali, CO', cat: 'ilustracion', available: true, likes: 228, title: 'Danzas invisibles', desc: 'Serie de ilustraciones sobre danza contemporánea, capturando el movimiento en imagen estática.', tags: ['Danza', 'Movimiento', 'Serie'], colors: ['#9D174D', '#DB2777', '#FDF2F8'], size: 'wide' },
  { id: 18, name: 'Esteban Muñoz', handle: '@esteban.disena', city: 'Medellín, CO', cat: 'diseno', available: true, likes: 336, title: 'Tipografía experimental', desc: 'Exploración tipográfica con nuevas formas de construir alfabetos desde la abstracción geométrica.', tags: ['Tipografía', 'Experimental', 'Geometría'], colors: ['#1D4ED8', '#60A5FA', '#EFF6FF'], size: 'normal' },
  { id: 19, name: 'Ana Lucia Torres', handle: '@ana.visual', city: 'Bogotá, CO', cat: 'ilustracion', available: false, likes: 444, title: 'Archivos de lo sagrado', desc: 'Ilustraciones documentales de rituales y ceremonias indígenas colombianas. Trabajo de investigación visual.', tags: ['Documental', 'Ritual', 'Colombia'], colors: ['#6D4C41', '#A1887F', '#EFEBE9'], size: 'tall' },
  { id: 20, name: 'Simón Castillo', handle: '@simon.animate', city: 'Bucaramanga, CO', cat: 'animacion', available: true, likes: 388, title: 'Física del caos', desc: 'Animaciones que simulan física imposible: objetos que caen hacia arriba, tiempo que se fragmenta.', tags: ['Experimental', 'Física', 'Loop'], colors: ['#065F46', '#6EE7B7', '#ECFDF5'], size: 'normal' },
  { id: 21, name: 'Juliana Acosta', handle: '@juli.concept', city: 'Cali, CO', cat: 'concept', available: true, likes: 263, title: 'Folclor futurista', desc: 'Personajes que fusionan mitología latinoamericana con estética cyberpunk para novela gráfica.', tags: ['Personajes', 'Cyberpunk', 'Folclor'], colors: ['#7C3AED', '#C026D3', '#FDF4FF'], size: 'normal' },
  { id: 22, name: 'Luis Bermúdez', handle: '@luis.ui', city: 'Cartagena, CO', cat: 'diseno', available: false, likes: 175, title: 'App Salud — UX/UI', desc: 'Diseño de interfaz para aplicación de salud mental. Flujos de usuario, prototipado y sistema de diseño.', tags: ['UX', 'UI', 'Salud'], colors: ['#0284C7', '#0EA5E9', '#F0F9FF'], size: 'wide' },
  { id: 23, name: 'Valeria Ríos', handle: '@valeria.ink', city: 'Medellín, CO', cat: 'ilustracion', available: true, likes: 512, title: 'Bestiario colombiano', desc: 'Reinterpretación fantástica de animales endémicos de Colombia, con referencias a la flora local.', tags: ['Fauna', 'Colombia', 'Fantasía'], colors: ['#166534', '#22C55E', '#F0FDF4'], size: 'normal' },
  { id: 24, name: 'Camilo Herrera', handle: '@camilo.3d', city: 'Bogotá, CO', cat: 'animacion', available: true, likes: 629, title: 'Geometría emocional', desc: 'Animaciones abstractas donde figuras geométricas simples comunican estados emocionales complejos.', tags: ['Abstracto', 'Emocional', '3D'], colors: ['#831843', '#BE185D', '#FDF2F8'], size: 'tall' },
  { id: 25, name: 'Sara Mosquera', handle: '@sara.concept', city: 'Popayán, CO', cat: 'concept', available: false, likes: 317, title: 'Deidades del páramo', desc: 'Character design basado en mitología colombiana andina, para una producción audiovisual en desarrollo.', tags: ['Character design', 'Mitología', 'Andino'], colors: ['#1C3D5A', '#3B82F6', '#EFF6FF'], size: 'normal' },
  { id: 26, name: 'Pablo Escovar', handle: '@pablo.brand', city: 'Manizales, CO', cat: 'diseno', available: true, likes: 241, title: 'Editorial Eje', desc: 'Diseño editorial para revista de cultura cafetera: layout, retícula, paleta y jerarquía tipográfica.', tags: ['Editorial', 'Revista', 'Retícula'], colors: ['#78350F', '#CA8A04', '#FEF9C3'], size: 'normal' },
  { id: 27, name: 'Daniela Vargas', handle: '@dani.ilustra', city: 'Medellín, CO', cat: 'ilustracion', available: true, likes: 463, title: 'La ciudad que baila', desc: 'Ilustraciones urbanas de Medellín capturando la energía de sus barrios desde una perspectiva isométrica.', tags: ['Urbano', 'Isométrico', 'Medellín'], colors: ['#4338CA', '#818CF8', '#E0E7FF'], size: 'wide' },
  { id: 28, name: 'Carlos Pineda', handle: '@carlos.concept', city: 'Cali, CO', cat: 'concept', available: true, likes: 398, title: 'Mechs del Pacífico', desc: 'Diseño de mechas inspirados en la cultura del Pacífico colombiano, para videojuego indie.', tags: ['Mecha', 'Videojuego', 'Cultura'], colors: ['#0C4A6E', '#0369A1', '#E0F2FE'], size: 'normal' },
  { id: 29, name: 'Michelle Santana', handle: '@michelle.art', city: 'Barranquilla, CO', cat: 'ilustracion', available: false, likes: 387, title: 'Carnaval eterno', desc: 'Serie de 12 ilustraciones sobre el Carnaval de Barranquilla como ritual de transformación colectiva.', tags: ['Carnaval', 'Serie', 'Tradición'], colors: ['#B45309', '#FBBF24', '#FEF3C7'], size: 'tall' },
  { id: 30, name: 'Alejandro Ossa', handle: '@ale.motion', city: 'Bogotá, CO', cat: 'animacion', available: true, likes: 554, title: 'Datos en movimiento', desc: 'Data visualization animada para reportes anuales corporativos. Información compleja hecha accesible.', tags: ['Data viz', 'Corporativo', 'Animación'], colors: ['#047857', '#10B981', '#D1FAE5'], size: 'normal' },
  { id: 31, name: 'Paola Jiménez', handle: '@paola.design', city: 'Medellín, CO', cat: 'diseno', available: true, likes: 291, title: 'Packaging artesanal', desc: 'Diseño de empaques para productores locales de alimentos. Materiales reciclables y estética artesanal.', tags: ['Packaging', 'Artesanal', 'Sostenible'], colors: ['#65A30D', '#A3E635', '#F7FEE7'], size: 'normal' },
  { id: 32, name: 'Tomás Echeverri', handle: '@tomas.concept', city: 'Cali, CO', cat: 'concept', available: true, likes: 474, title: 'Reinos sumergidos', desc: 'Entornos submarinos fantásticos para proyecto de worldbuilding. Arquitectura, fauna y ecosistemas propios.', tags: ['Submarino', 'Fantasy', 'Environment'], colors: ['#0C4A6E', '#1D4ED8', '#EFF6FF'], size: 'wide' },
];

/* ── Paletas de gradiente para los canvas ── */
const GRADIENT_SETS = [
  ['#7C3AED', '#A78BFA', '#C4B5FD'],
  ['#0369A1', '#0EA5E9', '#7DD3FC'],
  ['#BE185D', '#EC4899', '#F9A8D4'],
  ['#059669', '#34D399', '#A7F3D0'],
  ['#B45309', '#F59E0B', '#FDE68A'],
  ['#5B21B6', '#7C3AED', '#DDD6FE'],
  ['#0F766E', '#14B8A6', '#99F6E4'],
  ['#831843', '#BE185D', '#FBCFE8'],
  ['#166534', '#22C55E', '#BBF7D0'],
  ['#1C3D5A', '#3B82F6', '#BFDBFE'],
];

/* ── Renderizar un canvas de obra de arte ── */
function drawArtwork(canvas, colors, title, seed) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // Fondo degradado radial
  const grd = ctx.createRadialGradient(w * 0.35, h * 0.4, 0, w * 0.6, h * 0.6, Math.max(w, h) * 0.9);
  grd.addColorStop(0, colors[0]);
  grd.addColorStop(0.5, colors[1] || colors[0]);
  grd.addColorStop(1, colors[2] || colors[1] || colors[0]);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);

  // Formas decorativas basadas en seed
  const rng = (() => { let s = seed * 9301 + 49297; return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; })();

  ctx.save();
  ctx.globalAlpha = 0.22;
  for (let i = 0; i < 5; i++) {
    const x = rng() * w, y = rng() * h;
    const r = 30 + rng() * 80;
    const g2 = ctx.createRadialGradient(x, y, 0, x, y, r);
    g2.addColorStop(0, '#ffffff');
    g2.addColorStop(1, 'transparent');
    ctx.fillStyle = g2;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * (0.5 + rng() * 0.8), rng() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Líneas decorativas
  ctx.save();
  ctx.globalAlpha = 0.12;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(rng() * w, rng() * h);
    ctx.bezierCurveTo(rng() * w, rng() * h, rng() * w, rng() * h, rng() * w, rng() * h);
    ctx.stroke();
  }
  ctx.restore();

  // Nombre de la obra (sutil)
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#fff';
  ctx.font = `900 ${Math.floor(h * 0.13)}px 'Playfair Display', Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const words = title.split(' ');
  const line1 = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const line2 = words.slice(Math.ceil(words.length / 2)).join(' ');
  if (line2) {
    ctx.fillText(line1, w / 2, h * 0.44);
    ctx.fillText(line2, w / 2, h * 0.58);
  } else {
    ctx.fillText(line1, w / 2, h / 2);
  }
  ctx.restore();
}

function drawAvatar(canvas, colors) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const grd = ctx.createLinearGradient(0, 0, w, h);
  grd.addColorStop(0, colors[0]);
  grd.addColorStop(1, colors[1] || colors[0]);
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();
}

/* ── Construir una tarjeta masonry ── */
let currentFilter = 'all';
let visibleCount = 0;
const PAGE_SIZE = 32;

function getAspectRatio(size) {
  if (size === 'tall') return { w: 400, h: 560 };
  if (size === 'wide') return { w: 800, h: 420 };
  return { w: 400, h: 300 + Math.floor(Math.random() * 160) };
}

function buildCard(artist) {
  const dims = getAspectRatio(artist.size);

  const card = document.createElement('article');
  card.className = 'mcard';
  card.dataset.cat = artist.cat;
  card.dataset.id = artist.id;
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${artist.title} por ${artist.name}`);

  // Canvas artwork
  const canvas = document.createElement('canvas');
  canvas.className = 'mcard__canvas';
  canvas.width = dims.w;
  canvas.height = dims.h;
  canvas.style.display = 'block';
  canvas.style.width = '100%';
  canvas.style.aspectRatio = `${dims.w} / ${dims.h}`;

  // Badge permanente
  const badge = document.createElement('span');
  badge.className = 'mcard__badge' + (artist.available ? ' mcard__badge--open' : '');
  badge.textContent = artist.available ? 'Disponible' : artist.cat.charAt(0).toUpperCase() + artist.cat.slice(1);

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'mcard__overlay';
  overlay.setAttribute('aria-hidden', 'true');

  // Footer
  const footer = document.createElement('div');
  footer.className = 'mcard__footer';

  const avCanvas = document.createElement('canvas');
  avCanvas.width = avCanvas.height = 56;
  avCanvas.className = 'mcard__av';
  drawAvatar(avCanvas, artist.colors);

  const authorDiv = document.createElement('div');
  authorDiv.className = 'mcard__author';
  const authorText = document.createElement('div');
  authorText.innerHTML = `<strong>${artist.name}</strong><span>${artist.handle} · ${artist.city}</span>`;
  authorDiv.appendChild(avCanvas);
  authorDiv.appendChild(authorText);

  const meta = document.createElement('div');
  meta.className = 'mcard__meta';
  const tagEl = document.createElement('span');
  tagEl.className = 'mcard__tag' + (artist.available ? ' mcard__tag--open' : '');
  tagEl.textContent = artist.title;
  const likesEl = document.createElement('span');
  likesEl.className = 'mcard__likes';
  likesEl.innerHTML = `<svg viewBox="0 0 13 13" fill="currentColor" aria-hidden="true"><path d="M6.5 11.5S1 8 1 4.5a2.5 2.5 0 0 1 5.5-.5 2.5 2.5 0 0 1 5.5.5C12 8 6.5 11.5 6.5 11.5z" fill="rgba(255,255,255,.65)"/></svg>${artist.likes.toLocaleString('es')}`;

  meta.appendChild(tagEl);
  meta.appendChild(likesEl);
  footer.appendChild(authorDiv);
  footer.appendChild(meta);

  card.appendChild(canvas);
  card.appendChild(badge);
  card.appendChild(overlay);
  card.appendChild(footer);

  // Draw after appending (needs layout for font loading)
  setTimeout(() => drawArtwork(canvas, artist.colors, artist.title, artist.id), 0);

  // Events
  card.addEventListener('click', () => openModal(artist));
  card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(artist); } });

  return card;
}

/* ── Renderizar grid ── */
function renderGrid(filter) {
  currentFilter = filter;
  const grid = document.getElementById('masonryGrid');
  grid.innerHTML = '';

  const filtered = ARTISTS.filter(a => {
    if (filter === 'all') return true;
    if (filter === 'disponible') return a.available;
    return a.cat === filter;
  });

  const emptyState = document.getElementById('emptyState');
  if (filtered.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
    filtered.forEach((artist, i) => {
      const card = buildCard(artist);
      grid.appendChild(card);
      setTimeout(() => card.classList.add('in'), 40 + i * 35);
    });
  }

  const resultCount = document.getElementById('resultCount');
  if (resultCount) resultCount.textContent = `${filtered.length} obra${filtered.length !== 1 ? 's' : ''}`;
}


const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchSuggestions = document.getElementById('searchSuggestions');
const searchBox = document.getElementById('searchBox');

let searchQuery = '';
let suggHighlight = -1;  // índice de sugerencia activa con teclado

/* Campos sobre los que busca */
const SEARCH_FIELDS = a => [
  a.name, a.handle, a.city, a.title, a.desc,
  a.cat, ...a.tags
].join(' ').toLowerCase();

/* Normalizar texto: quita tildes y pasa a minúsculas */
const normalize = str =>
  str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/* Highlight: envuelve coincidencias en <mark> */
function highlight(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(${escaped})`, 'gi');
  return text.replace(re, '<mark>$1</mark>');
}

/* Filtrar artistas por texto */
function filterBySearch(list, q) {
  if (!q) return list;
  const nq = normalize(q);
  return list.filter(a => normalize(SEARCH_FIELDS(a)).includes(nq));
}

/* Construir sugerencias (máx. 6) */
function buildSuggestions(q) {
  const matches = filterBySearch(ARTISTS, q).slice(0, 6);
  searchSuggestions.innerHTML = '';
  suggHighlight = -1;

  if (!q) {
    searchSuggestions.hidden = true;
    return;
  }

  if (matches.length === 0) {
    searchSuggestions.innerHTML =
      `<li class="sugg-empty">
         <strong>Sin resultados para "${q}"</strong>
         Prueba con otro nombre o disciplina
       </li>`;
    searchSuggestions.hidden = false;
    return;
  }

  matches.forEach((artist, i) => {
    const li = document.createElement('li');
    li.className = 'sugg-item';
    li.setAttribute('role', 'option');
    li.dataset.index = i;

    // Mini avatar canvas
    const av = document.createElement('canvas');
    av.width = av.height = 64;
    av.className = 'sugg-item__av';
    drawAvatar(av, artist.colors);

    const textDiv = document.createElement('div');
    textDiv.className = 'sugg-item__text';
    textDiv.innerHTML = `
      <strong>${highlight(artist.name, q)}</strong>
      <span>${highlight(artist.title, q)} · ${artist.city}</span>
    `;

    li.appendChild(av);
    li.appendChild(textDiv);

    li.addEventListener('mousedown', e => {
      // mousedown antes de blur para no perder el foco
      e.preventDefault();
      selectSuggestion(artist);
    });

    searchSuggestions.appendChild(li);
  });

  searchSuggestions.hidden = false;
}

/* Seleccionar una sugerencia */
function selectSuggestion(artist) {
  searchInput.value = artist.name;
  searchQuery = artist.name;
  closeSuggestions();
  applySearch(artist.name);
}

/* Cerrar dropdown */
function closeSuggestions() {
  searchSuggestions.hidden = true;
  suggHighlight = -1;
}

/* Navegar por sugerencias con teclado */
function moveSuggestion(dir) {
  const items = searchSuggestions.querySelectorAll('.sugg-item');
  if (!items.length) return;
  items.forEach(el => el.removeAttribute('aria-selected'));
  suggHighlight = Math.max(-1, Math.min(items.length - 1, suggHighlight + dir));
  if (suggHighlight >= 0) {
    items[suggHighlight].setAttribute('aria-selected', 'true');
    items[suggHighlight].scrollIntoView({ block: 'nearest' });
  }
}

/* Aplicar búsqueda + re-render */
function applySearch(q) {
  searchQuery = q.trim();
  searchBox.classList.toggle('search-box--active', !!searchQuery);
  searchClear.hidden = !searchQuery;
  updateSearchStatus();

  // Re-renderizar mezclando filtro de categoría y búsqueda
  applyFilters();
}

/* Actualizar chip de estado encima del grid */
function updateSearchStatus() {
  let statusEl = document.getElementById('searchStatus');
  if (!statusEl) {
    statusEl = document.createElement('div');
    statusEl.id = 'searchStatus';
    statusEl.className = 'search-status';
    const wrapper = document.querySelector('.masonry-wrapper');
    wrapper.parentNode.insertBefore(statusEl, wrapper);
  }

  if (!searchQuery) {
    statusEl.hidden = true;
    return;
  }

  const count = filterBySearch(
    ARTISTS.filter(a => {
      if (currentFilter === 'all') return true;
      if (currentFilter === 'disponible') return a.available;
      return a.cat === currentFilter;
    }), searchQuery
  ).length;

  statusEl.hidden = false;
  statusEl.innerHTML = `
    Mostrando <strong>${count} resultado${count !== 1 ? 's' : ''}</strong> para
    <span class="search-chip">
      "${searchQuery}"
      <button aria-label="Quitar búsqueda" id="clearChipBtn">✕</button>
    </span>
  `;

  document.getElementById('clearChipBtn')?.addEventListener('click', clearSearch);
}

/* Limpiar búsqueda */
function clearSearch() {
  searchInput.value = '';
  searchQuery = '';
  searchBox.classList.remove('search-box--active');
  searchClear.hidden = true;
  closeSuggestions();
  updateSearchStatus();
  applyFilters();
}

/* Función unificada que aplica AMBOS filtros (categoría + texto) */
function applyFilters() {
  // 1. Filtrar por categoría
  let list = ARTISTS.filter(a => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'disponible') return a.available;
    return a.cat === currentFilter;
  });

  // 2. Filtrar por texto de búsqueda
  list = filterBySearch(list, searchQuery);

  // 3. Re-renderizar
  const grid = document.getElementById('masonryGrid');
  grid.innerHTML = '';
  const emptyState = document.getElementById('emptyState');

  if (list.length === 0) {
    emptyState.classList.add('visible');
  } else {
    emptyState.classList.remove('visible');
    list.forEach((artist, i) => {
      const card = buildCard(artist);
      grid.appendChild(card);
      setTimeout(() => card.classList.add('in'), 40 + i * 35);
    });
  }

  const resultCount = document.getElementById('resultCount');
  if (resultCount) resultCount.textContent = `${list.length} obra${list.length !== 1 ? 's' : ''}`;
}

/* ── Eventos del input ── */
searchInput.addEventListener('input', () => {
  const q = searchInput.value;
  searchClear.hidden = !q;
  buildSuggestions(q);
  // Búsqueda en tiempo real con pequeño debounce
  clearTimeout(searchInput._debounce);
  searchInput._debounce = setTimeout(() => applySearch(q), 220);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown') { e.preventDefault(); moveSuggestion(1); }
  if (e.key === 'ArrowUp') { e.preventDefault(); moveSuggestion(-1); }
  if (e.key === 'Enter') {
    e.preventDefault();
    const items = searchSuggestions.querySelectorAll('.sugg-item');
    if (suggHighlight >= 0 && items[suggHighlight]) {
      const idx = parseInt(items[suggHighlight].dataset.index);
      const cat = currentFilter === 'all' ? ARTISTS : ARTISTS.filter(a =>
        currentFilter === 'disponible' ? a.available : a.cat === currentFilter
      );
      selectSuggestion(filterBySearch(cat, searchInput.value)[idx]);
    } else {
      closeSuggestions();
      applySearch(searchInput.value);
    }
  }
  if (e.key === 'Escape') { closeSuggestions(); searchInput.blur(); }
});

searchInput.addEventListener('focus', () => {
  if (searchInput.value) buildSuggestions(searchInput.value);
});

searchInput.addEventListener('blur', () => {
  // Pequeño delay para permitir el click en sugerencia (mousedown lo previene)
  setTimeout(closeSuggestions, 120);
});

searchClear.addEventListener('click', clearSearch);

/* Reemplazar renderGrid() en los filtros de categoría para que use applyFilters() */
document.querySelectorAll('.ft-btn').forEach(btn => {
  // Remover listeners anteriores clonando el nodo
  const fresh = btn.cloneNode(true);
  btn.parentNode.replaceChild(fresh, btn);
  fresh.addEventListener('click', () => {
    document.querySelectorAll('.ft-btn').forEach(b => b.classList.remove('active'));
    fresh.classList.add('active');
    currentFilter = fresh.dataset.cat || 'all';
    applyFilters();   // usa applyFilters en vez de renderGrid para respetar la búsqueda
    updateSearchStatus();
  });
});

/* ── Filtros ── */
document.querySelectorAll('.ft-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ft-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGrid(btn.dataset.cat || 'all');
  });
});

/* ── Ordenar ── */
document.getElementById('sortSelect')?.addEventListener('change', e => {
  const val = e.target.value;
  const sorted = [...ARTISTS].sort((a, b) => {
    if (val === 'popular') return b.likes - a.likes;
    if (val === 'az') return a.name.localeCompare(b.name);
    return a.id - b.id;
  });
  ARTISTS.length = 0;
  sorted.forEach(a => ARTISTS.push(a));
  renderGrid(currentFilter);
});

/* ── Load more (muestra todos de todos modos, aquí es decorativo) ── */
document.getElementById('loadMore')?.addEventListener('click', function () {
  this.textContent = 'Todo el talento está aquí ✦';
  this.disabled = true;
  this.style.opacity = '.5';
});

/* ── Modal lightbox ── */
function openModal(artist) {
  const backdrop = document.getElementById('modalBackdrop');
  const canvas = document.getElementById('modalArtwork');
  const avCanvas = document.getElementById('modalAv');

  document.getElementById('modalAuthorName').textContent = artist.name;
  document.getElementById('modalAuthorTag').textContent = `${artist.handle} · ${artist.city}`;
  document.getElementById('modalTitle').textContent = artist.title;
  document.getElementById('modalDesc').textContent = artist.desc;

  const tagsEl = document.getElementById('modalTags');
  tagsEl.innerHTML = '';
  artist.tags.forEach(t => {
    const s = document.createElement('span'); s.textContent = t; tagsEl.appendChild(s);
  });

  drawArtwork(canvas, artist.colors, artist.title, artist.id + 100);
  drawAvatar(avCanvas, artist.colors);

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalBackdrop')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

/* ── Cursor ── */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;
if (cursor && trail) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  const loop = () => {
    tx += (mx - tx) * .12; ty += (my - ty) * .12;
    trail.style.left = tx + 'px'; trail.style.top = ty + 'px';
    requestAnimationFrame(loop);
  };
  loop();
  document.querySelectorAll('a,button,.mcard').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = cursor.style.height = '18px';
      cursor.style.background = 'var(--s)';
      trail.style.width = trail.style.height = '48px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = cursor.style.height = '10px';
      cursor.style.background = 'var(--p)';
      trail.style.width = trail.style.height = '32px';
    });
  });
}

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 50), { passive: true });
}

/* ── Reveal ── */
const revObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revObserver.unobserve(e.target); } });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => revObserver.observe(el));
setTimeout(() => document.querySelectorAll('.page-header .reveal').forEach(el => el.classList.add('visible')), 60);

/* ── Contador ── */
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = parseInt(el.dataset.target);
    const dur = 1600, step = 16, inc = target / (dur / step);
    let cur = 0;
    const tick = () => {
      cur = Math.min(cur + inc, target);
      el.textContent = Math.floor(cur).toLocaleString('es');
      if (cur < target) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('es');
    };
    requestAnimationFrame(tick);
    cntObs.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('[data-target]').forEach(el => cntObs.observe(el));

/* ── Init ── */
renderGrid('all');