/**
 * Navigation module.
 * Handles navbar hide-on-scroll, hamburger menu toggle,
 * and active section highlighting via IntersectionObserver.
 */

export function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  /** @type {number} */
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 10);
    if (currentScroll > 100) {
      navbar.classList.toggle('nav-hidden', currentScroll > lastScroll && currentScroll > 200);
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active', isOpen);
    mobileMenu.classList.toggle('hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    });
  });

  // Close mobile menu on scroll
  window.addEventListener('scroll', () => {
    if (mobileMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }, { passive: true });

  // Active section tracking
  const navLinks = document.querySelectorAll('.navbar-links a, .mobile-menu a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' });

  document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));
}
