/* ══════════════════════════════════════════════
   REGISTRO.JS — Acceso / VenusArt
══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── TABS ── */
  const tabLogin    = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const panelLogin  = document.getElementById('panelLogin');
  const panelReg    = document.getElementById('panelRegister');
  const indicator   = document.getElementById('tabIndicator');

  function switchTab(target) {
    const isLogin = target === 'login';

    tabLogin.classList.toggle('active', isLogin);
    tabRegister.classList.toggle('active', !isLogin);
    tabLogin.setAttribute('aria-selected', isLogin);
    tabRegister.setAttribute('aria-selected', !isLogin);

    panelLogin.classList.toggle('active', isLogin);
    panelReg.classList.toggle('active', !isLogin);

    indicator.classList.toggle('right', !isLogin);

    clearErrors();
  }

  tabLogin.addEventListener('click',    () => switchTab('login'));
  tabRegister.addEventListener('click', () => switchTab('register'));

  // Links de cambio entre paneles
  document.getElementById('goToRegister').addEventListener('click', () => switchTab('register'));
  document.getElementById('goToLogin').addEventListener('click',    () => switchTab('login'));


  /* ── MOSTRAR / OCULTAR CONTRASEÑA ── */
  function toggleEye(inputId, btn) {
    const input = document.getElementById(inputId);
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.setAttribute('aria-label', isText ? 'Mostrar contraseña' : 'Ocultar contraseña');
    // Cambiar ícono
    btn.querySelector('svg').innerHTML = isText
      ? '<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/>'
      : '<path d="M1 1l14 14M6.5 6.6A2 2 0 0 0 8 10a2 2 0 0 0 1.4-.6M10.7 5.3A7 7 0 0 1 15 8s-2.5 5-7 5a6.9 6.9 0 0 1-2.7-.55M3.3 3.3A6.9 6.9 0 0 0 1 8s2.5 5 7 5"/>';
  }

  document.getElementById('loginEye').addEventListener('click', function () {
    toggleEye('loginPassword', this);
  });
  document.getElementById('regEye').addEventListener('click', function () {
    toggleEye('regPassword', this);
  });


  /* ── FORTALEZA DE CONTRASEÑA ── */
  const regPassword = document.getElementById('regPassword');
  const pwFill      = document.getElementById('pwFill');
  const pwLabel     = document.getElementById('pwLabel');

  const strengthLevels = [
    { label: '',        color: 'transparent', width: '0%' },
    { label: 'Débil',   color: '#F87171',     width: '25%' },
    { label: 'Regular', color: '#FBBF24',     width: '55%' },
    { label: 'Buena',   color: '#34D399',     width: '80%' },
    { label: 'Fuerte',  color: '#059669',     width: '100%' },
  ];

  function calcStrength(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8)  score++;
    if (pw.length >= 12) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(4, Math.ceil(score * 4 / 5));
  }

  regPassword.addEventListener('input', () => {
    const level = calcStrength(regPassword.value);
    const s = strengthLevels[level];
    pwFill.style.width      = s.width;
    pwFill.style.background = s.color;
    pwLabel.textContent     = s.label;
    pwLabel.style.color     = s.color;
  });


  /* ── VALIDACIÓN ── */
  function setError(fieldId, errId, msg) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(errId);
    if (field) field.classList.add('is-error');
    if (err)   err.textContent = msg;
    return false;
  }

  function setOk(fieldId, errId) {
    const field = document.getElementById(fieldId);
    const err   = document.getElementById(errId);
    if (field) { field.classList.remove('is-error'); field.classList.add('is-ok'); }
    if (err)   err.textContent = '';
  }

  function clearErrors() {
    document.querySelectorAll('.auth-input').forEach(el => {
      el.classList.remove('is-error', 'is-ok');
    });
    document.querySelectorAll('.auth-field__error').forEach(el => {
      el.textContent = '';
    });
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validateLogin() {
    clearErrors();
    let ok = true;
    const email = document.getElementById('loginEmail').value.trim();
    const pass  = document.getElementById('loginPassword').value;

    if (!email)              { setError('loginEmail',    'loginEmailErr',    'Ingresa tu correo'); ok = false; }
    else if (!isValidEmail(email)) { setError('loginEmail', 'loginEmailErr', 'Correo inválido'); ok = false; }
    else setOk('loginEmail', 'loginEmailErr');

    if (!pass)               { setError('loginPassword', 'loginPasswordErr', 'Ingresa tu contraseña'); ok = false; }
    else setOk('loginPassword', 'loginPasswordErr');

    return ok;
  }

  function validateRegister() {
    clearErrors();
    let ok = true;

    const name       = document.getElementById('regName').value.trim();
    const handle     = document.getElementById('regHandle').value.trim();
    const email      = document.getElementById('regEmail').value.trim();
    const discipline = document.getElementById('regDiscipline').value;
    const pass       = document.getElementById('regPassword').value;
    const terms      = document.getElementById('regTerms').checked;

    if (!name || name.length < 2) {
      setError('regName', 'regNameErr', 'Ingresa tu nombre completo'); ok = false;
    } else setOk('regName', 'regNameErr');

    if (!handle || handle.length < 2) {
      setError('regHandle', 'regHandleErr', 'Elige un usuario'); ok = false;
    } else if (/\s/.test(handle)) {
      setError('regHandle', 'regHandleErr', 'Sin espacios'); ok = false;
    } else setOk('regHandle', 'regHandleErr');

    if (!email)                    { setError('regEmail', 'regEmailErr', 'Ingresa tu correo'); ok = false; }
    else if (!isValidEmail(email)) { setError('regEmail', 'regEmailErr', 'Correo inválido'); ok = false; }
    else setOk('regEmail', 'regEmailErr');

    if (!discipline) {
      setError('regDiscipline', 'regDisciplineErr', 'Elige tu disciplina'); ok = false;
    } else setOk('regDiscipline', 'regDisciplineErr');

    if (!pass || pass.length < 8) {
      setError('regPassword', 'regPasswordErr', 'Mínimo 8 caracteres'); ok = false;
    } else if (calcStrength(pass) < 2) {
      setError('regPassword', 'regPasswordErr', 'La contraseña es demasiado débil'); ok = false;
    } else setOk('regPassword', 'regPasswordErr');

    if (!terms) {
      document.getElementById('regTermsErr').textContent = 'Debes aceptar los términos para continuar';
      ok = false;
    } else {
      document.getElementById('regTermsErr').textContent = '';
    }

    return ok;
  }


  /* ── SUBMIT LOGIN ── */
  document.getElementById('loginBtn').addEventListener('click', function () {
    if (!validateLogin()) return;

    this.classList.add('loading');
    this.disabled = true;

    // Simular petición
    setTimeout(() => {
      this.classList.remove('loading');
      this.disabled = false;
      showToast('¡Bienvenid@ de vuelta! ✦', 'success');
      // En producción: redirigir a portafolio
      setTimeout(() => { window.location.href = 'portafolio.html'; }, 1200);
    }, 1400);
  });


  /* ── SUBMIT REGISTRO ── */
  document.getElementById('registerBtn').addEventListener('click', function () {
    if (!validateRegister()) return;

    this.classList.add('loading');
    this.disabled = true;

    setTimeout(() => {
      this.classList.remove('loading');
      this.disabled = false;
      showToast('¡Portafolio creado! Redirigiendo… ✦', 'success');
      setTimeout(() => { window.location.href = 'portafolio.html'; }, 1400);
    }, 1600);
  });


  /* ── LIMPIAR error al escribir ── */
  document.querySelectorAll('.auth-input').forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('is-error')) {
        input.classList.remove('is-error');
        const errEl = document.getElementById(input.id + 'Err');
        if (errEl) errEl.textContent = '';
      }
    });
  });


  /* ── TOAST ── */
  function showToast(msg, type = '') {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast' + (type ? ' toast--' + type : '');
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => t.classList.remove('show'), 2800);
  }


  /* ── SOCIAL BUTTONS (demo) ── */
  document.querySelectorAll('.auth-social-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const provider = this.getAttribute('aria-label').replace('Continuar con ', '');
      showToast(`Conectando con ${provider}…`);
    });
  });

});