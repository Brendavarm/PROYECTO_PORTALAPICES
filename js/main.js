/**
 * GoalDesk Smart 2026 — JavaScript principal
 * UNIFRANZ · Ingeniería de Sistemas
 */

(function () {
  'use strict';

  /* ========== LOADER ========== */
  const loader = document.getElementById('loader');
  document.body.classList.add('loading');

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
      initHeroAnimations();
    }, 2200);
  });

  /* ========== AOS ========== */
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });

  /* ========== GSAP SCROLL ========== */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-badge', { opacity: 0, y: 30, duration: 1, delay: 2.3 });
    gsap.from('.title-line', { opacity: 0, x: -40, duration: 0.8, stagger: 0.15, delay: 2.4 });

    document.querySelectorAll('.feature-card, .tech-item').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 85%' },
        opacity: 0,
        y: 40,
        duration: 0.6,
      });
    });
  }

  function initHeroAnimations() {
    const exploreBtn = document.getElementById('exploreBtn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('#producto')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  /* ========== HEADER SCROLL ========== */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ========== MOBILE NAV ========== */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle?.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navMenu.classList.remove('open'));
  });

  /* ========== CUSTOM CURSOR ========== */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
  }

  /* ========== PARTICLES ========== */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.min(80, Math.floor(w / 20));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.5,
          dy: (Math.random() - 0.5) * 0.5,
          gold: Math.random() > 0.7,
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > w) p.dx *= -1;
        if (p.y < 0 || p.y > h) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? 'rgba(212, 175, 55, 0.6)' : 'rgba(255, 255, 255, 0.15)';
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ========== COUNTDOWN MUNDIAL 2026 ========== */
  const targetDate = new Date('2026-06-11T16:00:00').getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    const el = (id, val) => {
      const node = document.getElementById(id);
      if (node) node.textContent = pad(val);
    };
    el('cd-days', days);
    el('cd-hours', hours);
    el('cd-mins', mins);
    el('cd-secs', secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ========== HERO STATS COUNTER ========== */
  function animateCounters() {
    document.querySelectorAll('.stat-num[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 2000;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateCounters();
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ========== PERSONALIZACIÓN ========== */
  const userName = document.getElementById('userName');
  const userCareer = document.getElementById('userCareer');
  const userTeam = document.getElementById('userTeam');
  const previewName = document.getElementById('previewName');
  const previewCareer = document.getElementById('previewCareer');
  const previewTeam = document.getElementById('previewTeam');
  const previewBody = document.getElementById('previewBody');
  const colorPicker = document.getElementById('colorPicker');

  function updatePreview() {
    const name = userName?.value.trim() || 'TU NOMBRE';
    previewName.textContent = name.toUpperCase();
    previewCareer.textContent = userCareer?.value || 'Ing. Sistemas';
    previewTeam.textContent = userTeam?.value || '🇧🇴 Bolivia';
  }

  userName?.addEventListener('input', updatePreview);
  userCareer?.addEventListener('change', updatePreview);
  userTeam?.addEventListener('change', updatePreview);

  colorPicker?.querySelectorAll('.color-opt').forEach((btn) => {
    btn.addEventListener('click', () => {
      colorPicker.querySelectorAll('.color-opt').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const color = btn.dataset.color;
      if (previewBody) {
        previewBody.style.borderColor = color;
        previewBody.querySelector('.preview-led-bar').style.background = color;
        previewBody.querySelector('.preview-led-bar').style.boxShadow = `0 0 12px ${color}`;
      }
    });
  });

  /* ========== QR CANVAS + MODAL ========== */
  const qrCanvas = document.getElementById('qrCanvas');
  if (qrCanvas) {
    const qctx = qrCanvas.getContext('2d');
    const size = 180;
    const cells = 15;
    const cellSize = size / cells;

    qctx.fillStyle = '#ffffff';
    qctx.fillRect(0, 0, size, size);

    function drawQRPattern() {
      for (let row = 0; row < cells; row++) {
        for (let col = 0; col < cells; col++) {
          const isCorner =
            (row < 4 && col < 4) ||
            (row < 4 && col >= cells - 4) ||
            (row >= cells - 4 && col < 4);
          const hash = (row * 17 + col * 31) % 5;
          if (isCorner || hash < 2) {
            qctx.fillStyle = '#0a0a0f';
            qctx.fillRect(col * cellSize, row * cellSize, cellSize - 1, cellSize - 1);
          }
        }
      }
      qctx.fillStyle = '#d4af37';
      qctx.fillRect(5 * cellSize, 7 * cellSize, 5 * cellSize, 5 * cellSize);
    }
    drawQRPattern();
  }

  const qrModal = document.getElementById('qrModal');
  const qrTrigger = document.getElementById('qrTrigger');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCatalog = document.getElementById('modalCatalog');

  function openModal() {
    qrModal?.classList.add('open');
    qrModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    qrModal?.classList.remove('open');
    qrModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  qrTrigger?.addEventListener('click', openModal);
  modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  modalCatalog?.addEventListener('click', closeModal);

  /* ========== GALERÍA ========== */
  const galleryTrack = document.getElementById('galleryTrack');
  const slides = galleryTrack?.querySelectorAll('.gallery-slide') || [];
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');
  const galleryDots = document.getElementById('galleryDots');
  const thumbs = document.querySelectorAll('.thumb');
  let currentSlide = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    galleryDots?.appendChild(dot);
  });

  const dots = galleryDots?.querySelectorAll('.dot') || [];

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    thumbs.forEach((t, i) => t.classList.toggle('active', i === currentSlide));
  }

  galleryPrev?.addEventListener('click', () => goToSlide(currentSlide - 1));
  galleryNext?.addEventListener('click', () => goToSlide(currentSlide + 1));
  thumbs.forEach((t) => t.addEventListener('click', () => goToSlide(parseInt(t.dataset.index, 10))));

  setInterval(() => goToSlide(currentSlide + 1), 6000);

  /* Lightbox zoom */
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  const lightboxClose = document.getElementById('lightboxClose');

  document.querySelectorAll('.gallery-img').forEach((img, i) => {
    img.addEventListener('click', () => {
      const clone = img.cloneNode(true);
      clone.style.height = '70vh';
      clone.style.width = 'min(90vw, 800px)';
      clone.style.borderRadius = '16px';
      lightboxContent.innerHTML = '';
      lightboxContent.appendChild(clone);
      lightbox.classList.add('open');
    });
  });

  lightboxClose?.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('open');
  });

  /* ========== HOLOGRAM 3D TILT ========== */
  const hologramCard = document.getElementById('hologramCard');
  const product3d = document.getElementById('product3d');

  hologramCard?.addEventListener('mousemove', (e) => {
    const rect = hologramCard.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (product3d) {
      product3d.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg)`;
    }
  });

  hologramCard?.addEventListener('mouseleave', () => {
    if (product3d) product3d.style.transform = '';
  });

  /* ========== SONIDO ESTADIO (Web Audio) ========== */
  const soundBtn = document.getElementById('soundBtn');
  let audioCtx = null;
  let ambienceNodes = [];
  let soundPlaying = false;

  function createStadiumAmbience() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 0.5;

    const gain = audioCtx.createGain();
    gain.gain.value = 0.06;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    source.start(0);

    ambienceNodes = [source, filter, gain];
    soundPlaying = true;
    soundBtn?.classList.add('active');
  }

  function stopAmbience() {
    ambienceNodes.forEach((n) => {
      try { n.stop?.(); n.disconnect?.(); } catch (_) {}
    });
    ambienceNodes = [];
    soundPlaying = false;
    soundBtn?.classList.remove('active');
  }

  soundBtn?.addEventListener('click', () => {
    if (soundPlaying) {
      stopAmbience();
    } else {
      createStadiumAmbience();
    }
  });

  /* ========== CHATBOT ========== */
  const chatToggle = document.getElementById('chatToggle');
  const chatPanel = document.getElementById('chatPanel');
  const chatClose = document.getElementById('chatClose');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');

  const botReplies = {
    '¿qué es goaldesk?': 'GoalDesk Smart 2026 es un organizador de escritorio impreso en 3D con temática del Mundial FIFA 2026, QR interactivo y personalización. Proyecto de Ingeniería de Sistemas en UNIFRANZ.',
    '¿qué es?': 'GoalDesk es un portalápices inteligente con diseño de balón, compartimentos, soporte móvil y conexión digital vía QR.',
    'personalizar': 'Ve a la sección "Personaliza tu GoalDesk" — puedes elegir nombre, color, carrera y selección favorita con vista previa en tiempo real.',
    '¿cómo personalizar?': 'En la sección Personaliza puedes configurar nombre, colores, carrera UNIFRANZ y tu selección del Mundial 2026.',
    'precio': 'Somos un emprendimiento universitario en fase de prototipo. Contáctanos por WhatsApp para cotización personalizada.',
    '¿precio?': 'Contáctanos por WhatsApp para conocer precios según personalización. ¡Cada GoalDesk es único!',
    'mundial': 'La Copa Mundial 2026 será en USA, México y Canadá con 48 selecciones y 104 partidos. ¡GoalDesk celebra este evento histórico!',
    'unifranz': 'GoalDesk nace en UNIFRANZ como proyecto de Ingeniería de Sistemas, fusionando hardware (3D), software (web/QR) e IoT futuro.',
    'default': 'Gracias por tu interés en GoalDesk Smart 2026. Explora las secciones del sitio o escanea el QR para más información. ⚽',
  };

  function getBotReply(msg) {
    const key = msg.toLowerCase().trim();
    for (const [k, v] of Object.entries(botReplies)) {
      if (key.includes(k.replace('¿', '').replace('?', '')) || key.includes(k)) return v;
    }
    return botReplies.default;
  }

  function addMessage(text, isUser) {
    const div = document.createElement('div');
    div.className = 'chat-msg ' + (isUser ? 'user' : 'bot');
    div.textContent = text;
    chatMessages?.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleChatSend(text) {
    if (!text.trim()) return;
    addMessage(text, true);
    chatInput.value = '';
    setTimeout(() => addMessage(getBotReply(text), false), 600);
  }

  chatToggle?.addEventListener('click', () => chatPanel?.classList.toggle('open'));
  chatClose?.addEventListener('click', () => chatPanel?.classList.remove('open'));
  chatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleChatSend(chatInput.value);
  });

  document.querySelectorAll('.chat-quick button').forEach((btn) => {
    btn.addEventListener('click', () => handleChatSend(btn.dataset.msg));
  });

  /* ========== SMOOTH REVEAL ON SCROLL ========== */
  const revealElements = document.querySelectorAll('.story-block:not([data-aos])');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
  });

})();
