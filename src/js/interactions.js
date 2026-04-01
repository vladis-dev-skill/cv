/**
 * Micro-interactions module.
 *
 * - Magnetic cursor on CTA buttons (desktop only)
 * - Contact card magnetic icon (desktop only)
 * - Contact card click ripple
 * - Stat pill hover (hero)
 */

const isMobile = () =>
  window.innerWidth < 768 || 'ontouchstart' in window;

// ========== MAGNETIC BUTTONS ==========

function initMagneticButtons() {
  if (isMobile()) return;

  document.querySelectorAll('.btn-shine').forEach(btn => {
    const el = /** @type {HTMLElement} */ (btn);
    let rafId = 0;

    el.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.3;
        const dy = (e.clientY - cy) * 0.3;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
        el.style.transition = 'transform 0.15s ease';
      });
    });

    el.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafId);
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ========== CONTACT MAGNETIC ICON ==========

function initContactMagnetic() {
  if (isMobile()) return;

  document.querySelectorAll('.contact-card').forEach(card => {
    const icon = card.querySelector('.contact-icon');
    if (!icon) return;

    const iconEl = /** @type {HTMLElement} */ (icon);
    let rafId = 0;

    card.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = Math.max(-8, Math.min(8, (e.clientX - cx) * 0.15));
        const dy = Math.max(-8, Math.min(8, (e.clientY - cy) * 0.15));
        iconEl.style.transform = `translate(${dx}px, ${dy}px) scale(1.1) rotate(-5deg)`;
        iconEl.style.transition = 'transform 0.1s ease';
      });
    });

    card.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafId);
      iconEl.style.transform = '';
      iconEl.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ========== CONTACT CLICK RIPPLE ==========

function initContactRipple() {
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ========== STAT PILL HOVER (hero) ==========

function initStatPillHover() {
  if (isMobile()) return;

  document.querySelectorAll('.stat-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      /** @type {HTMLElement} */ (pill).style.transform = 'scale(1.05)';
      /** @type {HTMLElement} */ (pill).style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
    pill.addEventListener('mouseleave', () => {
      /** @type {HTMLElement} */ (pill).style.transform = '';
      /** @type {HTMLElement} */ (pill).style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ========== PUBLIC API ==========

export function initInteractions() {
  initMagneticButtons();
  initContactMagnetic();
  initContactRipple();
  initStatPillHover();
}
