/* ============================================
   AENRA – script.js
   All interactive JavaScript functionality
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* =====================
     1. NAVBAR SCROLL FX
     ===================== */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  /* =====================
     2. HAMBURGER MENU
     ===================== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });


  /* =====================
     3. SCROLL ANIMATIONS
     ===================== */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Respect animation-delay if set via inline style
        entry.target.classList.add('visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedEls.forEach(el => animObserver.observe(el));


  /* =====================
     4. SMOOTH NAV SCROLL
     ===================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* =====================
     5. ACTIVE NAV LINK
     ===================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => sectionObserver.observe(s));


  /* =====================
     6. CONTACT FORM
     ===================== */
  const sendBtn = document.getElementById('sendBtn');
  const formFeedback = document.getElementById('formFeedback');

  sendBtn.addEventListener('click', () => {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();

    // Reset feedback
    formFeedback.textContent = '';
    formFeedback.className = 'form-feedback';

    // Basic validation
    if (!name) {
      showFeedback('Harap masukkan nama Anda.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      showFeedback('Harap masukkan email yang valid.', 'error');
      return;
    }
    if (!message) {
      showFeedback('Harap masukkan pesan Anda.', 'error');
      return;
    }

    // Simulate sending
    sendBtn.textContent = 'Mengirim...';
    sendBtn.disabled = true;

    setTimeout(() => {
      sendBtn.textContent = 'Kirim Pesan';
      sendBtn.disabled = false;
      document.getElementById('nameInput').value = '';
      document.getElementById('emailInput').value = '';
      document.getElementById('messageInput').value = '';
      showFeedback('✓ Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
    }, 1800);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFeedback(msg, type) {
    formFeedback.textContent = msg;
    formFeedback.classList.add(type);
  }


  /* =====================
     7. ABOUT US BUTTON
     ===================== */
  const aboutBtn = document.getElementById('aboutBtn');
  if (aboutBtn) {
    aboutBtn.addEventListener('click', () => {
      const service = document.getElementById('service');
      if (service) {
        const top = service.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }


  /* =====================
     8. HERO IMAGE PARALLAX
     ===================== */
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    window.addEventListener('mousemove', (e) => {
      const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
      heroImg.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    window.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'rotateY(0) rotateX(0)';
    });
  }

  /* =====================
     9. SERVICE CARD RIPPLE
     ===================== */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      const rect = card.getBoundingClientRect();
      ripple.style.cssText = `
        position: absolute;
        width: 4px; height: 4px;
        background: rgba(0,200,215,0.4);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.5s linear;
        left: ${e.clientX - rect.left}px;
        top: ${e.clientY - rect.top}px;
        pointer-events: none;
      `;
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(80); opacity: 0; }
    }
    .nav-link.active { color: var(--cyan); }
    .nav-link.active::after { width: 100%; }
  `;
  document.head.appendChild(style);

});
