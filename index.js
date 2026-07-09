/* ============================================
   JOHN LESTER DEMATERA — Portfolio Interactivity
   Navigation · Scroll Reveal · Modals · Contact
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // 1. NAVBAR SCROLL BEHAVIOR
  // ============================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('#navbar a[href^="#"]:not([href="#"])');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('bg-background/80', 'backdrop-blur-xl', 'border-outline-variant', 'shadow-sm');
      navbar.classList.remove('bg-transparent', 'border-transparent');
    } else {
      navbar.classList.remove('bg-background/80', 'backdrop-blur-xl', 'border-outline-variant', 'shadow-sm');
      navbar.classList.add('bg-transparent', 'border-transparent');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ============================================
  // 2. ACTIVE SECTION TRACKING (IntersectionObserver)
  // ============================================
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('text-primary', 'font-semibold');
          link.classList.add('text-on-surface-variant');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.remove('text-on-surface-variant');
            link.classList.add('text-primary', 'font-semibold');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ============================================
  // 3. SMOOTH SCROLL & MOBILE MENU LINK CLOSE
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }

      // Close mobile menu if open
      const mobileMenu = document.getElementById('mobile-menu');
      const menuToggle = document.getElementById('menu-toggle');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        menuToggle.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // ============================================
  // 4. MOBILE MENU TOGGLE
  // ============================================
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isClosed = mobileMenu.classList.toggle('hidden');
      menuToggle.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', (!isClosed).toString());
      document.body.style.overflow = isClosed ? '' : 'hidden';
    });
  }

  // ============================================
  // 5. SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 6. CASE STUDY & CERTIFICATE MODALS
  // ============================================
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = `modal-${trigger.getAttribute('data-modal')}`;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal(modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal);
    });
  });

  // Close modal on overlay click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(closeModal);
    }
  });

  // ============================================
  // 7. CONTACT FORM HANDLING
  // ============================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) return;

      // Open mailto client with subject and body
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:johnlesterdematera0961@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // ============================================
  // 8. HERO PARALLAX DEPTH EFFECT
  // ============================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const parallaxLayers = document.querySelectorAll('.parallax-layer[data-parallax-speed]');
  const heroSection = document.getElementById('about');
  let parallaxTicking = false;

  function updateParallax() {
    if (!heroSection || prefersReducedMotion.matches || window.innerWidth < 1024) {
      // Reset transforms on mobile or when reduced motion is preferred
      parallaxLayers.forEach(layer => { layer.style.transform = ''; });
      parallaxTicking = false;
      return;
    }

    const heroRect = heroSection.getBoundingClientRect();
    const heroBottom = heroRect.bottom;

    // Only apply when the hero is visible (performance)
    if (heroBottom > 0) {
      const scrolled = window.scrollY;
      parallaxLayers.forEach(layer => {
        const speed = parseFloat(layer.dataset.parallaxSpeed) || 0;
        const yOffset = -(scrolled * speed);
        layer.style.transform = `translateY(${yOffset}px)`;
      });
    }

    parallaxTicking = false;
  }

  function onParallaxScroll() {
    if (!parallaxTicking) {
      parallaxTicking = true;
      requestAnimationFrame(updateParallax);
    }
  }

  // Only attach if we have layers and not reduced-motion
  if (parallaxLayers.length > 0) {
    window.addEventListener('scroll', onParallaxScroll, { passive: true });
    window.addEventListener('resize', () => {
      requestAnimationFrame(updateParallax);
    }, { passive: true });
  }
});
