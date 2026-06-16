/* ══════════════════════════════════════════════════════════
   PORTFOLIO.JS — Vista pública + Vista dueño unificadas
══════════════════════════════════════════════════════════ */

/* ── Detectar modo ──────────────────────────────────────────
   En producción: isOwner = (sesión.userId === portafolio.userId)
   Aquí: ?owner=1 en la URL o localStorage para demo           */
const params  = new URLSearchParams(location.search);
let isOwner   = params.get('owner') === '1' || localStorage.getItem('va_demo_owner') === '1';

/* ── DATOS (en producción vendrían del backend) ── */
const ARTIST = {
  name:'Luna Vásquez', handle:'@luna.art', city:'Medellín, CO',
  discipline:'Ilustración', available:true,
  bio:'Ilustradora editorial y de personajes. Me muevo entre la acuarela digital y el diseño de portadas. Trabajo con editoriales, estudios de juegos y marcas que aprecian lo hecho a mano.',
  colors:['#7C3AED','#A78BFA','#EDE9FE'],
};

let FOLDERS = [
  {id:'all',      name:'Todo'},
  {id:'editorial',name:'Editorial'},
  {id:'personajes',name:'Personajes'},
  {id:'portadas', name:'Portadas'},
  {id:'personal', name:'Personal'},
];

let WORKS = [
  {id:1,  title:'Jardín de sombras',     desc:'Serie editorial sobre naturaleza y melancolía urbana.',          tags:['Editorial','Acuarela','Serie'],      folder:'editorial',  colors:['#7C3AED','#A78BFA','#C4B5FD'], size:'tall',   likes:42, order:0},
  {id:2,  title:'Mariposa mecánica',     desc:'Personaje para novela gráfica de ciencia ficción.',              tags:['Personaje','Sci-fi','Color'],        folder:'personajes', colors:['#0369A1','#38BDF8','#BAE6FD'], size:'normal', likes:31, order:1},
  {id:3,  title:'La última librería',    desc:'Portada para colección de cuentos latinoamericanos.',            tags:['Portada','Libro','Cálido'],          folder:'portadas',   colors:['#B45309','#F59E0B','#FEF3C7'], size:'normal', likes:58, order:2},
  {id:4,  title:'Raíces',                desc:'Exploración personal sobre identidad y pertenencia.',            tags:['Personal','Expresión','Tierra'],     folder:'personal',   colors:['#166534','#22C55E','#D1FAE5'], size:'wide',   likes:77, order:3},
  {id:5,  title:'Criatura del páramo',   desc:'Diseño basado en el ecosistema de páramo colombiano.',           tags:['Criatura','Naturaleza','Colombia'],  folder:'personajes', colors:['#065F46','#10B981','#A7F3D0'], size:'tall',   likes:93, order:4},
  {id:6,  title:'Noche boreal',          desc:'Portada para novela de misterio escandinavo.',                   tags:['Portada','Noche','Misterio'],        folder:'portadas',   colors:['#1C3D5A','#1D4ED8','#DBEAFE'], size:'normal', likes:45, order:5},
  {id:7,  title:'Mercado de los sueños', desc:'Ilustración editorial para revista cultural bogotana.',          tags:['Editorial','Ciudad','Sueños'],       folder:'editorial',  colors:['#831843','#BE185D','#FBCFE8'], size:'normal', likes:62, order:6},
  {id:8,  title:'Autorretrato en azul',  desc:'Exploración introspectiva con paleta monocromática.',            tags:['Personal','Retrato','Azul'],         folder:'personal',   colors:['#1E3A5F','#2563EB','#BFDBFE'], size:'normal', likes:88, order:7},
  {id:9,  title:'La guardiana del río',  desc:'Personaje mitológico colombiano para videojuego.',               tags:['Personaje','Mitología','Colombia'],  folder:'personajes', colors:['#065F46','#34D399','#A7F3D0'], size:'wide',   likes:114,order:8},
  {id:10, title:'Temporada de lluvias',  desc:'Portada para poemario de autor colombiano.',                     tags:['Portada','Poesía','Lluvia'],         folder:'portadas',   colors:['#5B21B6','#7C3AED','#DDD6FE'], size:'tall',   likes:39, order:9},
  {id:11, title:'Flores de papel',       desc:'Serie de postales para editorial independiente.',                 tags:['Editorial','Flores','Postal'],       folder:'editorial',  colors:['#9D174D','#EC4899','#FCE7F3'], size:'normal', likes:55, order:10},
  {id:12, title:'El inventor',           desc:'Personaje steampunk para novela juvenil.',                        tags:['Personaje','Steampunk','Juvenil'],   folder:'personajes', colors:['#78350F','#D97706','#FEF3C7'], size:'normal', likes:27, order:11},
];
let nextId = 13;

/* ── ESTADO ── */
let currentFolder = 'all';
let currentFilter = 'all';
let likedWorks    = new Set();
let profileLiked  = false;
let lbIndex       = 0;
let visibleWorks  = [];
let editingWorkId = null;
let deleteTargetId = null;
let dragSrcId     = null;
let currentTags   = [];

/* ════════ CANVAS ════════ */
function drawCanvas(canvas, colors, title, seed, w=400, h=300) {
  canvas.width=w; canvas.height=h;
  const ctx=canvas.getContext('2d');
  const gr=ctx.createRadialGradient(w*.35,h*.4,0,w*.6,h*.6,Math.max(w,h)*.9);
  gr.addColorStop(0,colors[0]); gr.addColorStop(.5,colors[1]||colors[0]); gr.addColorStop(1,colors[2]||colors[0]);
  ctx.fillStyle=gr; ctx.fillRect(0,0,w,h);
  const rng=(()=>{let s=seed*9301+49297;return()=>{s=(s*9301+49297)%233280;return s/233280};})();
  ctx.save(); ctx.globalAlpha=.18;
  for(let i=0;i<4;i++){const x=rng()*w,y=rng()*h,r=25+rng()*70;const g2=ctx.createRadialGradient(x,y,0,x,y,r);g2.addColorStop(0,'#fff');g2.addColorStop(1,'transparent');ctx.fillStyle=g2;ctx.beginPath();ctx.ellipse(x,y,r,r*(.4+rng()*.8),rng()*Math.PI,0,Math.PI*2);ctx.fill();}
  ctx.restore();
  ctx.save(); ctx.globalAlpha=.14; ctx.fillStyle='#fff';
  const words=title.split(' '),mid=Math.ceil(words.length/2);
  const l1=words.slice(0,mid).join(' '),l2=words.slice(mid).join(' ');
  ctx.font=`900 ${Math.floor(h*.11)}px 'Playfair Display',Georgia,serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  if(l2){ctx.fillText(l1,w/2,h*.43);ctx.fillText(l2,w/2,h*.57);}else ctx.fillText(l1,w/2,h/2);
  ctx.restore();
  /* Marca de agua (siempre activa) */
  ctx.save(); ctx.globalAlpha=.10; ctx.fillStyle='#fff';
  ctx.font=`500 ${Math.max(11,Math.floor(w*.025))}px 'Outfit',sans-serif`;
  ctx.textAlign='center'; ctx.textBaseline='middle';
  ctx.translate(w/2,h/2); ctx.rotate(-Math.PI/6);
  for(let x=-w;x<w*2;x+=160){for(let y=-h;y<h*2;y+=80){ctx.fillText('venusart.co/luna.art',x,y);}}
  ctx.restore();
}
function drawAvatar(canvas,colors){
  const s=canvas.width,ctx=canvas.getContext('2d');
  const gr=ctx.createLinearGradient(0,0,s,s);
  gr.addColorStop(0,colors[0]); gr.addColorStop(1,colors[1]||colors[0]);
  ctx.beginPath();ctx.arc(s/2,s/2,s/2,0,Math.PI*2);ctx.fillStyle=gr;ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.85)';
  ctx.font=`900 ${Math.floor(s*.38)}px 'Playfair Display',Georgia,serif`;
  ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(ARTIST.name.split(' ').map(n=>n[0]).slice(0,2).join(''),s/2,s/2+2);
}

/* ════════ TOAST ════════ */
function showToast(msg, type='') {
  const t=document.getElementById('toast');
  t.textContent=msg; t.className='toast'+(type?' toast--'+type:'');
  requestAnimationFrame(()=>{ t.classList.add('show'); });
  setTimeout(()=>t.classList.remove('show'),2800);
}

/* ════════ MODALES ════════ */
function openModal(id){ document.getElementById(id).classList.add('open'); document.body.style.overflow='hidden'; }
function closeModal(id){ document.getElementById(id).classList.remove('open'); if(!document.querySelector('.modal-bg.open')) document.body.style.overflow=''; }
document.querySelectorAll('[data-close]').forEach(btn=>{
  btn.addEventListener('click',()=>closeModal(btn.dataset.close));
});
document.querySelectorAll('.modal-bg').forEach(bg=>{
  bg.addEventListener('click',e=>{ if(e.target===bg) closeModal(bg.id); });
});

/* ════════ MODO OWNER ════════ */
function applyOwnerMode() {
  document.body.classList.toggle('is-owner', isOwner);
  document.getElementById('ownerBar').classList.toggle('visible', isOwner);
  document.getElementById('pfHero').classList.toggle('owner-offset', isOwner);
  /* Edición inline */
  document.querySelectorAll('.editable-field').forEach(el=>{
    el.contentEditable = isOwner ? 'true' : 'false';
  });
  renderGrid();
  renderFolders();
  renderFilters();
}

/* Toggle vista visitante desde la topbar */
const viewToggle = document.getElementById('viewToggle');
viewToggle.addEventListener('click', ()=>{
  isOwner = !isOwner;
  viewToggle.classList.toggle('on', isOwner);
  viewToggle.parentElement.querySelector('.view-toggle-label').textContent =
    isOwner ? 'Ver como visitante' : 'Modo edición activo';
  applyOwnerMode();
  showToast(isOwner ? 'Modo edición activado ✦' : 'Vista de visitante');
});

/* ════════ DISPONIBILIDAD ════════ */
let artistAvailable = ARTIST.available;
function updateAvailUI() {
  const badge = document.getElementById('availBadge');
  const pill  = document.getElementById('pfAvailPill');
  const dot   = document.getElementById('availDot');
  const text  = document.getElementById('availText');
  const toggle= document.getElementById('availToggle');
  badge.className = 'pf-badge-online' + (artistAvailable ? '' : ' busy');
  pill.className  = 'pf-meta-pill ' + (artistAvailable ? 'pf-meta-pill--avail' : 'pf-meta-pill--busy');
  pill.textContent = artistAvailable ? '✦ Disponible' : '⏸ Ocupada';
  dot.className   = 'avail-dot' + (artistAvailable ? '' : ' busy');
  text.textContent= artistAvailable ? 'Disponible — clic para cambiar' : 'Ocupada — clic para cambiar';
  toggle.className= 'avail-toggle-pill' + (artistAvailable ? '' : ' busy');
}
document.getElementById('availToggle').addEventListener('click', ()=>{
  artistAvailable = !artistAvailable;
  updateAvailUI();
  showToast(artistAvailable ? 'Ahora estás disponible ✓' : 'Estado: Ocupada', artistAvailable ? 'success' : '');
});

/* ════════ EDICIÓN INLINE ════════ */
document.getElementById('btnSaveProfile').addEventListener('click', ()=>{
  ARTIST.name       = document.getElementById('pfName').textContent.trim();
  ARTIST.city       = document.getElementById('pfCity').textContent.trim();
  ARTIST.discipline = document.getElementById('pfDiscipline').textContent.trim();
  ARTIST.bio        = document.getElementById('pfBio').textContent.trim();
  document.getElementById('footerName').textContent = ARTIST.name;
  showToast('Perfil actualizado ✓','success');
});

/* ════════ MODAL EDITAR PERFIL ════════ */
document.getElementById('btnEditProfile').addEventListener('click', ()=>{
  document.getElementById('editName').value       = ARTIST.name;
  document.getElementById('editHandle').value     = ARTIST.handle;
  document.getElementById('editCity').value       = ARTIST.city;
  document.getElementById('editDiscipline').value = ARTIST.discipline;
  document.getElementById('editBio').value        = ARTIST.bio;
  openModal('profileModal');
});
document.getElementById('profileSaveBtn').addEventListener('click', ()=>{
  ARTIST.name       = document.getElementById('editName').value.trim()       || ARTIST.name;
  ARTIST.handle     = document.getElementById('editHandle').value.trim()     || ARTIST.handle;
  ARTIST.city       = document.getElementById('editCity').value.trim()       || ARTIST.city;
  ARTIST.discipline = document.getElementById('editDiscipline').value        || ARTIST.discipline;
  ARTIST.bio        = document.getElementById('editBio').value.trim()        || ARTIST.bio;
  /* Actualizar UI */
  document.getElementById('pfName').textContent       = ARTIST.name;
  document.getElementById('pfHandle').textContent     = ARTIST.handle;
  document.getElementById('pfCity').textContent       = ARTIST.city;
  document.getElementById('pfDiscipline').textContent = ARTIST.discipline;
  document.getElementById('pfBio').textContent        = ARTIST.bio;
  document.getElementById('footerName').textContent   = ARTIST.name;
  closeModal('profileModal');
  showToast('Perfil guardado ✓','success');
});

/* ════════ CARPETAS ════════ */
function renderFolders() {
  const wrap = document.getElementById('pfFolders');
  wrap.innerHTML = '<span class="pf-folders__label">Carpetas</span>';
  FOLDERS.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'pf-folder-btn' + (f.id === currentFolder ? ' active' : '');
    btn.dataset.folder = f.id;
    const svgFolder = `<svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 3.5h11v7.5H1z"/><path d="M1 3.5l2-2h3l1 2"/></svg>`;
    const delBtn = f.id !== 'all' && isOwner
      ? `<button class="folder-del" data-folder-del="${f.id}" title="Eliminar carpeta" aria-label="Eliminar carpeta ${f.name}">✕</button>`
      : '';
    btn.innerHTML = svgFolder + f.name + delBtn;
    btn.addEventListener('click', e => {
      if(e.target.closest('.folder-del')) return;
      document.querySelectorAll('.pf-folder-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      currentFolder = f.id; currentFilter = 'all';
      document.querySelectorAll('.pf-filter-btn').forEach(b=>b.classList.remove('active'));
      document.querySelector('.pf-filter-btn[data-filter="all"]')?.classList.add('active');
      renderGrid();
    });
    wrap.appendChild(btn);
  });
  /* Eliminar carpeta */
  wrap.querySelectorAll('[data-folder-del]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const fid = btn.dataset.folderDel;
      FOLDERS = FOLDERS.filter(f=>f.id!==fid);
      WORKS.forEach(w=>{ if(w.folder===fid) w.folder=''; });
      if(currentFolder===fid){ currentFolder='all'; }
      renderFolders(); renderGrid();
      showToast('Carpeta eliminada');
    });
  });
  /* Botón nueva carpeta (dueño) */
  if(isOwner){
    const nbtn = document.createElement('button');
    nbtn.className = 'pf-folder-btn pf-folder-btn--new';
    nbtn.innerHTML = `<svg viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 2v9M2 6.5h9"/></svg> Nueva carpeta`;
    nbtn.addEventListener('click', ()=>openModal('folderModal'));
    wrap.appendChild(nbtn);
  }
}

document.getElementById('btnNewFolder').addEventListener('click', ()=>openModal('folderModal'));
document.getElementById('folderSaveBtn').addEventListener('click', ()=>{
  const name = document.getElementById('folderName').value.trim();
  if(!name) return;
  const id = name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
  if(FOLDERS.find(f=>f.id===id)){ showToast('Ya existe una carpeta con ese nombre','error'); return; }
  FOLDERS.push({id, name});
  document.getElementById('folderName').value='';
  closeModal('folderModal');
  renderFolders(); populateFolderSelect();
  showToast(`Carpeta "${name}" creada ✓`,'success');
});

function populateFolderSelect() {
  const sel = document.getElementById('workFolder');
  sel.innerHTML = FOLDERS.filter(f=>f.id!=='all').map(f=>`<option value="${f.id}">${f.name}</option>`).join('');
}

/* ════════ FILTROS ════════ */
function renderFilters() {
  const ALL_TAGS = [...new Set(WORKS.flatMap(w=>w.tags))];
  const wrap = document.getElementById('pfFilters');
  wrap.innerHTML = '<span class="pf-filters__label">Filtrar</span>';
  const allBtn = document.createElement('button');
  allBtn.className = 'pf-filter-btn' + (currentFilter==='all'?' active':'');
  allBtn.dataset.filter='all'; allBtn.textContent='Todas';
  allBtn.addEventListener('click', ()=>{ currentFilter='all'; renderFilters(); renderGrid(); });
  wrap.appendChild(allBtn);
  ALL_TAGS.forEach(tag=>{
    const btn=document.createElement('button');
    btn.className='pf-filter-btn'+(currentFilter===tag?' active':'');
    btn.dataset.filter=tag; btn.textContent=tag;
    btn.addEventListener('click',()=>{ currentFilter=tag; renderFilters(); renderGrid(); });
    wrap.appendChild(btn);
  });
}

/* ════════ TAGS EN MODAL ════════ */
function renderTagsUI(tags) {
  currentTags = [...tags];
  const wrap = document.getElementById('workTagsWrap');
  const input = document.getElementById('workTagInput');
  wrap.innerHTML = '';
  currentTags.forEach((tag,i)=>{
    const el = document.createElement('span');
    el.className='modal-tag';
    el.innerHTML=`${tag}<button aria-label="Eliminar tag ${tag}" data-ti="${i}">✕</button>`;
    el.querySelector('button').addEventListener('click',()=>{
      currentTags.splice(i,1); renderTagsUI(currentTags);
    });
    wrap.appendChild(el);
  });
  wrap.appendChild(input);
  input.focus();
}
document.getElementById('workTagInput').addEventListener('keydown', e=>{
  if(e.key==='Enter'||e.key===','){ e.preventDefault();
    const v=e.target.value.trim().replace(/,$/,'');
    if(v&&!currentTags.includes(v)){ currentTags.push(v); renderTagsUI(currentTags); }
    e.target.value='';
  }
});

/* ════════ SUBIR / EDITAR OBRA ════════ */
let workImageFile = null;
let workImageDataURL = null;

document.getElementById('btnUploadWork').addEventListener('click', ()=>openWorkModal(null));

function openWorkModal(workId) {
  editingWorkId = workId;
  workImageFile = null;
  workImageDataURL = null;
  populateFolderSelect();
  const modal = document.getElementById('workModal');
  const preview = document.getElementById('workPreview');
  document.getElementById('workModalTitle').textContent = workId ? 'Editar obra' : 'Subir nueva obra';

  if(workId) {
    const w = WORKS.find(x=>x.id===workId);
    document.getElementById('workTitle').value = w.title;
    document.getElementById('workDesc').value  = w.desc;
    document.getElementById('workFolder').value = w.folder;
    renderTagsUI(w.tags);
    /* Mostrar canvas como preview */
    const tmpCanvas = document.createElement('canvas');
    drawCanvas(tmpCanvas, w.colors, w.title, w.id, 400, 300);
    preview.innerHTML='';
    preview.appendChild(tmpCanvas);
    tmpCanvas.style.cssText='width:100%;height:100%;object-fit:cover;position:absolute;inset:0;border-radius:var(--r)';
  } else {
    document.getElementById('workTitle').value='';
    document.getElementById('workDesc').value='';
    renderTagsUI([]);
    preview.innerHTML=`<div class="up-hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>Haz clic o arrastra una imagen aquí<br><small>JPG, PNG, WEBP · Máx. 20 MB</small></div>`;
  }
  openModal('workModal');
}

/* Click en preview → file input */
document.getElementById('workPreview').addEventListener('click', ()=>document.getElementById('workFileInput').click());
document.getElementById('workFileInput').addEventListener('change', e=>{
  const file=e.target.files[0]; if(!file) return;
  workImageFile=file;
  const reader=new FileReader();
  reader.onload=ev=>{
    workImageDataURL=ev.target.result;
    const preview=document.getElementById('workPreview');
    preview.innerHTML=`<img src="${workImageDataURL}" alt="Preview">`;
  };
  reader.readAsDataURL(file);
});
/* Drag & drop en preview */
['dragover','dragenter'].forEach(evt=>
  document.getElementById('workPreview').addEventListener(evt,e=>{e.preventDefault();e.currentTarget.style.borderColor='var(--p)';}));
['dragleave','drop'].forEach(evt=>
  document.getElementById('workPreview').addEventListener(evt,e=>{e.preventDefault();e.currentTarget.style.borderColor='';
    if(evt==='drop'&&e.dataTransfer.files[0]){
      workImageFile=e.dataTransfer.files[0];
      const reader=new FileReader();
      reader.onload=ev=>{workImageDataURL=ev.target.result;document.getElementById('workPreview').innerHTML=`<img src="${ev.target.result}" alt="Preview">`};
      reader.readAsDataURL(workImageFile);
    }
  }));

/* Guardar obra */
document.getElementById('workSaveBtn').addEventListener('click', ()=>{
  const title  = document.getElementById('workTitle').value.trim();
  const desc   = document.getElementById('workDesc').value.trim();
  const folder = document.getElementById('workFolder').value;
  if(!title){ document.getElementById('workTitle').classList.add('is-error'); showToast('El título es obligatorio','error'); return; }
  document.getElementById('workTitle').classList.remove('is-error');

  const randomPalette = [
    ['#7C3AED','#A78BFA','#C4B5FD'],['#0369A1','#0EA5E9','#7DD3FC'],
    ['#BE185D','#EC4899','#F9A8D4'],['#059669','#34D399','#A7F3D0'],
    ['#B45309','#F59E0B','#FDE68A'],['#5B21B6','#7C3AED','#DDD6FE'],
  ];

  if(editingWorkId) {
    const w = WORKS.find(x=>x.id===editingWorkId);
    w.title=title; w.desc=desc; w.folder=folder; w.tags=[...currentTags];
    if(workImageDataURL) w.imageURL=workImageDataURL;
    closeModal('workModal');
    renderGrid(); renderFilters();
    showToast('Obra actualizada ✓','success');
  } else {
    const newWork = {
      id: nextId++, title, desc, folder,
      tags: [...currentTags],
      colors: randomPalette[Math.floor(Math.random()*randomPalette.length)],
      size: 'normal', likes: 0,
      order: WORKS.length,
      imageURL: workImageDataURL || null,
    };
    WORKS.push(newWork);
    closeModal('workModal');
    renderGrid(); renderFilters();
    document.getElementById('statObras').textContent = WORKS.length;
    showToast('Obra publicada ✓','success');
  }
});

/* ════════ ELIMINAR OBRA ════════ */
function confirmDelete(workId) {
  deleteTargetId = workId;
  openModal('deleteModal');
}
document.getElementById('deleteConfirmBtn').addEventListener('click', ()=>{
  WORKS = WORKS.filter(w=>w.id!==deleteTargetId);
  closeModal('deleteModal');
  renderGrid(); renderFilters();
  document.getElementById('statObras').textContent = WORKS.length;
  showToast('Obra eliminada');
});

/* ════════ DRAG & DROP REORDEN ════════ */
let dragOverId = null;
function setupDrag(card, workId) {
  card.setAttribute('draggable', isOwner ? 'true' : 'false');
  card.addEventListener('dragstart', e=>{
    if(!isOwner) return;
    dragSrcId = workId;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed='move';
  });
  card.addEventListener('dragend', ()=>{
    card.classList.remove('dragging');
    document.querySelectorAll('.drag-over').forEach(el=>el.classList.remove('drag-over'));
  });
  card.addEventListener('dragover', e=>{
    if(!isOwner||dragSrcId===workId) return;
    e.preventDefault(); e.dataTransfer.dropEffect='move';
    card.classList.add('drag-over');
  });
  card.addEventListener('dragleave', ()=>card.classList.remove('drag-over'));
  card.addEventListener('drop', e=>{
    if(!isOwner||dragSrcId===workId) return;
    e.preventDefault();
    card.classList.remove('drag-over');
    /* Intercambiar orden */
    const srcWork  = WORKS.find(w=>w.id===dragSrcId);
    const destWork = WORKS.find(w=>w.id===workId);
    if(srcWork&&destWork){ const tmp=srcWork.order; srcWork.order=destWork.order; destWork.order=tmp; }
    renderGrid();
    showToast('Orden actualizado ✦');
  });
}

/* ════════ CONSTRUIR TARJETA ════════ */
function buildCard(work) {
  const dims = work.size==='tall'?{w:400,h:560}:work.size==='wide'?{w:700,h:380}:{w:400,h:290+Math.floor(Math.random()*120)};
  const card = document.createElement('article');
  card.className='pf-card';
  card.dataset.id=work.id;
  card.setAttribute('role','listitem');
  card.setAttribute('aria-label',`${work.title}`);

  const inner = document.createElement('div');
  inner.className='pf-card__inner';

  /* Drag handle */
  const handle=document.createElement('div');
  handle.className='pf-card__drag-handle';
  handle.innerHTML=`<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 4h8M3 7h8M3 10h8"/></svg>`;
  handle.setAttribute('aria-hidden','true');

  /* Imagen o canvas */
  let mediaEl;
  if(work.imageURL) {
    mediaEl=document.createElement('img');
    mediaEl.src=work.imageURL; mediaEl.alt=work.title;
    mediaEl.className='pf-card__canvas';
    mediaEl.style.aspectRatio=`${dims.w}/${dims.h}`;
    mediaEl.style.objectFit='cover';
  } else {
    mediaEl=document.createElement('canvas');
    mediaEl.className='pf-card__canvas';
    mediaEl.width=dims.w; mediaEl.height=dims.h;
    mediaEl.style.display='block'; mediaEl.style.width='100%';
    mediaEl.style.aspectRatio=`${dims.w}/${dims.h}`;
    setTimeout(()=>drawCanvas(mediaEl,work.colors,work.title,work.id,dims.w,dims.h),0);
  }

  /* Capa protección */
  const protect=document.createElement('div');
  protect.className='pf-protect';

  /* Overlay */
  const overlay=document.createElement('div');
  overlay.className='pf-card__overlay'; overlay.setAttribute('aria-hidden','true');

  /* Footer */
  const footer=document.createElement('div');
  footer.className='pf-card__footer';
  const likeBtn=document.createElement('button');
  likeBtn.className='pf-card__like-btn'+(likedWorks.has(work.id)?' liked':'');
  likeBtn.setAttribute('aria-label',`Like a ${work.title}`);
  likeBtn.innerHTML=`<svg viewBox="0 0 15 15" fill="${likedWorks.has(work.id)?'#F472B6':'none'}" stroke="${likedWorks.has(work.id)?'#F472B6':'currentColor'}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 12.5S1.5 9 1.5 5a3 3 0 0 1 6 0 3 3 0 0 1 6 0c0 4-6 7.5-6 7.5z"/></svg><span>${work.likes}</span>`;
  footer.innerHTML=`<div class="pf-card__title">${work.title}</div><div class="pf-card__row"><span class="pf-card__tag">${work.tags[0]||''}</span></div>`;
  footer.querySelector('.pf-card__row').appendChild(likeBtn);

  /* Botones dueño */
  const ownerCtrl=document.createElement('div');
  ownerCtrl.className='pf-card__owner-ctrl';
  ownerCtrl.innerHTML=`
    <button class="oc-btn oc-btn--edit" title="Editar" aria-label="Editar obra">
      <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 2.5l2 2-7 7-2.5.5.5-2.5 7-7z"/></svg>
    </button>
    <button class="oc-btn oc-btn--delete" title="Eliminar" aria-label="Eliminar obra">
      <svg viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h11M5 4V3h5v1M3 4l1 9h7l1-9"/></svg>
    </button>`;
  ownerCtrl.querySelector('.oc-btn--edit').addEventListener('click',e=>{e.stopPropagation();openWorkModal(work.id);});
  ownerCtrl.querySelector('.oc-btn--delete').addEventListener('click',e=>{e.stopPropagation();confirmDelete(work.id);});

  inner.appendChild(handle);
  inner.appendChild(mediaEl);
  inner.appendChild(protect);
  inner.appendChild(overlay);
  inner.appendChild(footer);
  inner.appendChild(ownerCtrl);
  card.appendChild(inner);

  /* Click lightbox (solo si no es dueño o no es drag) */
  inner.addEventListener('click', e=>{
    if(e.target.closest('.pf-card__like-btn')||e.target.closest('.pf-card__owner-ctrl')) return;
    openLightbox(work.id);
  });

  /* Like */
  likeBtn.addEventListener('click',e=>{
    e.stopPropagation();
    toggleWorkLike(work.id, likeBtn);
  });

  /* Drag & drop */
  setupDrag(card, work.id);

  return card;
}

/* ════════ RENDER GRID ════════ */
function renderGrid() {
  const grid=document.getElementById('pfGrid');
  grid.innerHTML='';
  let list=WORKS.filter(w=>{
    const fOk=currentFolder==='all'||w.folder===currentFolder;
    const tOk=currentFilter==='all'||w.tags.map(t=>t.toLowerCase()).includes(currentFilter.toLowerCase());
    return fOk&&tOk;
  }).sort((a,b)=>a.order-b.order);

  const empty=document.getElementById('pfEmpty');
  if(list.length===0){empty.hidden=false;return;}
  empty.hidden=true;

  /* Upload zone al inicio en modo dueño */
  if(isOwner){
    const uz=document.createElement('div');
    uz.className='upload-zone';
    uz.innerHTML=`<div class="upload-zone__icon">⬆</div><p>Arrastra una imagen aquí</p><span>o haz clic para subir</span>`;
    uz.addEventListener('click',()=>openWorkModal(null));
    ['dragover','dragenter'].forEach(ev=>uz.addEventListener(ev,e=>{e.preventDefault();uz.classList.add('drag-active');}));
    ['dragleave','drop'].forEach(ev=>uz.addEventListener(ev,e=>{e.preventDefault();uz.classList.remove('drag-active');
      if(ev==='drop'&&e.dataTransfer.files[0]){
        workImageFile=e.dataTransfer.files[0];
        const reader=new FileReader();
        reader.onload=r=>{workImageDataURL=r.target.result;openWorkModal(null);};
        reader.readAsDataURL(workImageFile);
      }
    }));
    grid.appendChild(uz);
  }

  list.forEach((work,i)=>{
    const card=buildCard(work);
    grid.appendChild(card);
    setTimeout(()=>card.classList.add('in'),40+i*35);
  });
  document.getElementById('statObras').textContent=WORKS.length;
}

/* ════════ LIGHTBOX ════════ */
function openLightbox(workId){
  const idx=visibleWorks.findIndex(w=>w.id===workId);
  visibleWorks=WORKS.filter(w=>{
    const fOk=currentFolder==='all'||w.folder===currentFolder;
    const tOk=currentFilter==='all'||w.tags.map(t=>t.toLowerCase()).includes(currentFilter.toLowerCase());
    return fOk&&tOk;
  }).sort((a,b)=>a.order-b.order);
  lbIndex=Math.max(0,visibleWorks.findIndex(w=>w.id===workId));
  renderLightbox();
  document.getElementById('lbBackdrop').classList.add('open');
  const lbClose=document.getElementById('lbClose');
  lbClose.style.display='flex';
  document.getElementById('lbCounter').style.opacity='1';
  document.body.style.overflow='hidden';
}
function closeLightbox(){
  document.getElementById('lbBackdrop').classList.remove('open');
  document.getElementById('lbClose').style.display='none';
  document.getElementById('lbCounter').style.opacity='0';
  document.body.style.overflow='';
}
function renderLightbox(){
  const work=visibleWorks[lbIndex];
  if(!work)return;
  const canvas=document.getElementById('lbCanvas');
  if(work.imageURL){
    /* Dibujar imagen real con marca de agua encima, respetando la proporción */
    const img=new Image();
    img.onload=()=>{
      const MAX_W=720;
      const ratio=img.naturalHeight/img.naturalWidth;
      const w=MAX_W;
      const h=Math.round(w*ratio);
      canvas.width=w; canvas.height=h;
      const ctx=canvas.getContext('2d');
      ctx.drawImage(img,0,0,w,h);
      /* marca de agua */
      ctx.save();ctx.globalAlpha=.12;ctx.fillStyle='#fff';
      ctx.font='500 14px Outfit,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.translate(w/2,h/2);ctx.rotate(-Math.PI/6);
      for(let x=-w;x<w*2;x+=160){for(let y=-h;y<h*2;y+=80)ctx.fillText('venusart.co/luna.art',x,y);}
      ctx.restore();
    };
    img.src=work.imageURL;
  } else {
    drawCanvas(canvas,work.colors,work.title,work.id+50,720,420);
  }
  document.getElementById('lbTitle').textContent=work.title;
  document.getElementById('lbDesc').textContent=work.desc;
  const tagsEl=document.getElementById('lbTags');
  tagsEl.innerHTML='';
  work.tags.forEach(t=>{const s=document.createElement('span');s.textContent=t;tagsEl.appendChild(s);});
  const likeEl=document.getElementById('lbLike');
  const liked=likedWorks.has(work.id);
  document.getElementById('lbLikeCount').textContent=work.likes;
  likeEl.classList.toggle('liked',liked);
  likeEl.querySelector('svg').setAttribute('fill',liked?'#F472B6':'none');
  likeEl.querySelector('svg').setAttribute('stroke',liked?'#F472B6':'currentColor');
  document.getElementById('lbCounter').textContent=`${lbIndex+1} / ${visibleWorks.length}`;
}

function toggleWorkLike(workId,btn){
  const work=WORKS.find(w=>w.id===workId);if(!work)return;
  if(likedWorks.has(workId)){likedWorks.delete(workId);work.likes--;}
  else{likedWorks.add(workId);work.likes++;}
  if(btn){
    btn.classList.toggle('liked',likedWorks.has(workId));
    const svg=btn.querySelector('svg');
    svg.setAttribute('fill',likedWorks.has(workId)?'#F472B6':'none');
    svg.setAttribute('stroke',likedWorks.has(workId)?'#F472B6':'currentColor');
    btn.querySelector('span').textContent=work.likes;
  }
  const total=WORKS.reduce((s,w)=>s+w.likes,0);
  document.getElementById('statLikes').textContent=total;
  document.getElementById('likeCount').textContent=total;
}

document.getElementById('lbPrev').addEventListener('click',()=>{
  visibleWorks=WORKS.filter(w=>{const fOk=currentFolder==='all'||w.folder===currentFolder;const tOk=currentFilter==='all'||w.tags.map(t=>t.toLowerCase()).includes(currentFilter.toLowerCase());return fOk&&tOk;}).sort((a,b)=>a.order-b.order);
  lbIndex=(lbIndex-1+visibleWorks.length)%visibleWorks.length;renderLightbox();
});
document.getElementById('lbNext').addEventListener('click',()=>{
  visibleWorks=WORKS.filter(w=>{const fOk=currentFolder==='all'||w.folder===currentFolder;const tOk=currentFilter==='all'||w.tags.map(t=>t.toLowerCase()).includes(currentFilter.toLowerCase());return fOk&&tOk;}).sort((a,b)=>a.order-b.order);
  lbIndex=(lbIndex+1)%visibleWorks.length;renderLightbox();
});
document.getElementById('lbClose').addEventListener('click',closeLightbox);
document.getElementById('lbBackdrop').addEventListener('click',e=>{if(e.target===e.currentTarget)closeLightbox();});
document.getElementById('lbLike').addEventListener('click',()=>{const work=visibleWorks[lbIndex];if(work){toggleWorkLike(work.id,null);renderLightbox();}});
document.getElementById('lbContact').addEventListener('click',()=>{closeLightbox();openModal('msgModal');});

/* ════════ MODAL PROPUESTA ════════ */
document.getElementById('btnContact').addEventListener('click',()=>openModal('msgModal'));
document.getElementById('msgSendBtn').addEventListener('click',()=>{
  const name=document.getElementById('msgName').value.trim();
  const email=document.getElementById('msgEmail').value.trim();
  const body=document.getElementById('msgBody').value.trim();
  if(!name||!email||!body){showToast('Completa todos los campos','error');return;}
  const btn=document.getElementById('msgSendBtn');
  btn.disabled=true;btn.textContent='Enviando…';
  setTimeout(()=>{
    document.getElementById('msgForm').style.display='none';
    document.getElementById('msgSuccess').classList.add('show');
    setTimeout(()=>closeModal('msgModal'),2800);
  },1100);
});

/* ════════ LIKE PERFIL ════════ */
document.getElementById('btnLike').addEventListener('click',function(){
  profileLiked=!profileLiked;
  this.classList.toggle('liked',profileLiked);
  const count=parseInt(document.getElementById('likeCount').textContent);
  document.getElementById('likeCount').textContent=profileLiked?count+1:count-1;
});

/* ════════ AVATAR DUEÑO ════════ */
document.getElementById('avatarOverlay').addEventListener('click',()=>{
  if(!isOwner)return;
  const fi=document.createElement('input');fi.type='file';fi.accept='image/*';
  fi.onchange=e=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=r=>{
      const av=document.getElementById('pfAvatar');
      av.innerHTML=`<img src="${r.target.result}" alt="Foto de perfil" style="width:100%;height:100%;object-fit:cover">`;
      showToast('Foto actualizada ✓','success');
    };
    reader.readAsDataURL(file);
  };
  fi.click();
});

/* ════════ PROTECCIÓN ════════ */
document.addEventListener('contextmenu',e=>{
  if(!isOwner&&(e.target.tagName==='CANVAS'||e.target.tagName==='IMG'||e.target.closest('.pf-card')))
    e.preventDefault();
});
document.addEventListener('dragstart',e=>{
  if(!isOwner&&(e.target.tagName==='IMG'||e.target.tagName==='CANVAS'))
    e.preventDefault();
});
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&(e.key==='s'||e.key==='u'))
    if(!isOwner)e.preventDefault();
  /* Lightbox keyboard */
  if(document.getElementById('lbBackdrop').classList.contains('open')){
    if(e.key==='ArrowRight'){visibleWorks=WORKS.filter(w=>{const fOk=currentFolder==='all'||w.folder===currentFolder;const tOk=currentFilter==='all'||w.tags.map(t=>t.toLowerCase()).includes(currentFilter.toLowerCase());return fOk&&tOk;}).sort((a,b)=>a.order-b.order);lbIndex=(lbIndex+1)%visibleWorks.length;renderLightbox();}
    if(e.key==='ArrowLeft') {visibleWorks=WORKS.filter(w=>{const fOk=currentFolder==='all'||w.folder===currentFolder;const tOk=currentFilter==='all'||w.tags.map(t=>t.toLowerCase()).includes(currentFilter.toLowerCase());return fOk&&tOk;}).sort((a,b)=>a.order-b.order);lbIndex=(lbIndex-1+visibleWorks.length)%visibleWorks.length;renderLightbox();}
    if(e.key==='Escape')    closeLightbox();
  }
});

/* ════════ NAV SCROLL ════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('pfNav').classList.toggle('scrolled',scrollY>50);
},{passive:true});

/* ════════ REVEAL ════════ */
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');ro.unobserve(e.target);}});
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));
setTimeout(()=>document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible')),100);

/* ════════ INIT ════════ */
drawAvatar(document.getElementById('avatarCanvas'), ARTIST.colors);
document.getElementById('pfName').textContent=ARTIST.name;
document.getElementById('pfHandle').textContent=ARTIST.handle;
document.getElementById('pfCity').textContent=ARTIST.city;
document.getElementById('pfDiscipline').textContent=ARTIST.discipline;
document.getElementById('pfBio').textContent=ARTIST.bio;
document.getElementById('footerName').textContent=ARTIST.name;
document.getElementById('msgArtistName').textContent=ARTIST.name.split(' ')[0];
updateAvailUI();
populateFolderSelect();

/* Activar vista dueño para demo */
if(isOwner){ viewToggle.classList.add('on'); }
applyOwnerMode();

/* Demo helper: botón en footer para alternar modo (solo en demo) */
const demoBtn=document.createElement('button');
demoBtn.textContent=isOwner?'👁 Ver como visitante':'✏ Modo dueño (demo)';
demoBtn.style.cssText='background:none;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.4);border-radius:100px;padding:.3rem .85rem;font-size:.72rem;cursor:pointer;transition:all .2s';
demoBtn.addEventListener('click',()=>{
  isOwner=!isOwner;
  localStorage.setItem('va_demo_owner',isOwner?'1':'0');
  viewToggle.classList.toggle('on',isOwner);
  demoBtn.textContent=isOwner?'👁 Ver como visitante':'✏ Modo dueño (demo)';
  applyOwnerMode();
  showToast(isOwner?'Modo edición activado ✦':'Vista de visitante activada');
});
document.querySelector('.pf-footer').appendChild(demoBtn);