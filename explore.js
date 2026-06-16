
document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ── MENÚ BURGER ── */
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose  = document.getElementById('menuClose');
  let menuOpen = false;

  const toggleMenu = (forceClose = false) => {
    menuOpen = forceClose ? false : !menuOpen;
    if (mobileMenu) mobileMenu.classList.toggle('open', menuOpen);
    if (burger) {
      const spans = burger.querySelectorAll('span');
      if (menuOpen) {
        if (spans[0]) spans[0].style.cssText = 'transform: rotate(45deg) translate(4px, 4px)';
        if (spans[1]) spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
        if (spans[2]) spans[2].style.cssText = 'transform: rotate(-45deg) translate(4px, -4px)';
      } else {
        spans.forEach(s => s.removeAttribute('style'));
      }
    }
  };

  burger?.addEventListener('click', () => toggleMenu());
  menuClose?.addEventListener('click', () => toggleMenu(true));

  // Cerrar al hacer clic en un link del menú móvil
  document.querySelectorAll('.mobile-menu a, .m-link, .mobile-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(true));
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', e => {
    if (menuOpen && mobileMenu && !mobileMenu.contains(e.target) && e.target !== burger) {
      toggleMenu(true);
    }
  });


  /* ── REVEAL ON SCROLL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Activar hero inmediatamente
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal, .hero .reveal-right, .hero .reveal-scale')
      .forEach(el => el.classList.add('visible'));
  }, 80);


  /* ── CONTADOR ANIMADO ── */
  const counters = document.querySelectorAll('[data-target]');

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;

    const update = () => {
      current = Math.min(current + increment, target);
      el.textContent = Math.floor(current).toLocaleString('es');
      if (current < target) requestAnimationFrame(update);
      else el.textContent = target.toLocaleString('es');
    };
    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));


  /* ── FILTRO DE GALERÍA (discovery wall) ── */
  const filterBtns   = document.querySelectorAll('.df-btn');
  const discoveryCards = document.querySelectorAll('#discoveryWall .dw-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.df || 'all';

      discoveryCards.forEach(card => {
        const cat  = card.dataset.df || '';
        const show = filter === 'all' || cat === filter ||
                     (filter === 'disponible' && card.querySelector('.dw-badge--open'));

        if (show) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  /* ── NEWSLETTER FORM ── */
  const form = document.getElementById('newsletterForm');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const input  = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    if (!input || !button) return;
    const email  = input.value.trim();
    if (!email) return;

    button.textContent = 'Enviando…';
    button.disabled    = true;

    setTimeout(() => {
      button.textContent       = '¡Listo! ✓';
      button.style.background  = '#059669';
      input.value              = '';
      input.placeholder        = 'Te has suscrito con éxito';

      setTimeout(() => {
        button.textContent      = 'Suscribirme';
        button.disabled         = false;
        button.style.background = '';
        input.placeholder       = 'tu@correo.com';
      }, 3500);
    }, 1200);
  });


  /* ── PARALLAX SUAVE EN BLOBS ── */
  const blobs = document.querySelectorAll('.blob, .ctabg-blob');

  if (blobs.length) {
    const onMouseMove = (e) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      blobs.forEach((blob, i) => {
        const factor = (i % 2 === 0 ? 1 : -1) * (8 + i * 3);
        blob.style.transform = `translate(${dx * factor}px, ${dy * factor}px) scale(1)`;
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
  }


  /* ── SMOOTH SCROLL PARA ANCLAS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── TARJETAS DE GALERÍA: TILT 3D ── */
  const tiltCards = document.querySelectorAll('.gcard, .dw-card, .fcard');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const rotateX =  ((y - centerY) / centerY) * -4;
      const rotateY =  ((x - centerX) / centerX) *  4;
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── ACTIVE NAV LINK por sección visible ── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav__links a');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
  }

});