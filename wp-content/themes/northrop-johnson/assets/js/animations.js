// GSAP Animations for WordPress Theme - Optimized for Performance
document.addEventListener('DOMContentLoaded', () => {
  // Check if GSAP is loaded
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP not loaded, skipping animations');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Use batched animations to prevent creating hundreds of ScrollTriggers
  // This dramatically improves performance

  // Fade up animations - batched
  ScrollTrigger.batch('[data-animate="fade-up"]', {
    onEnter: (elements) => {
      gsap.fromTo(elements,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    },
    start: 'top 90%',
    once: true,
  });

  // Fade down animations - batched
  ScrollTrigger.batch('[data-animate="fade-down"]', {
    onEnter: (elements) => {
      gsap.fromTo(elements,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    },
    start: 'top 90%',
    once: true,
  });

  // Scale in animations - batched
  ScrollTrigger.batch('[data-animate="scale-in"]', {
    onEnter: (elements) => {
      gsap.fromTo(elements,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
      );
    },
    start: 'top 90%',
    once: true,
  });

  // Split text animations - limit to prevent performance issues
  const splitTextElements = document.querySelectorAll('[data-animate="split-text"]');
  // Only animate first 5 split-text elements to avoid performance hit
  Array.from(splitTextElements).slice(0, 5).forEach((el) => {
    const text = el.textContent || '';
    const words = text.split(' ').filter(w => w.trim());
    if (words.length === 0) return;

    el.innerHTML = words.map(word => `<span style="display:inline-block;opacity:0">${word}&nbsp;</span>`).join('');

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el.children, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.03,
          ease: 'power2.out',
        });
      },
    });
  });

  // Navigation scroll effect - simple scroll listener instead of ScrollTrigger
  const nav = document.querySelector('[data-section-name="navigation"]');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }
});
