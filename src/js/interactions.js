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

// ========== SKILL CARD 3D TILT ==========

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initSkillCardTilt() {
  if (isMobile() || prefersReducedMotion()) return;

  document.querySelectorAll('.skill-category').forEach(card => {
    const el = /** @type {HTMLElement} */ (card);
    let rafId = 0;

    el.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) translateY(-2px)`;
        el.style.transition = 'transform 0.1s ease';
      });
    });

    el.addEventListener('mouseleave', () => {
      cancelAnimationFrame(rafId);
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ========== SKILL PILL WAVE ON CARD HOVER ==========

function initSkillPillWave() {
  if (isMobile() || prefersReducedMotion()) return;

  document.querySelectorAll('.skill-category').forEach(card => {
    const pills = card.querySelectorAll('.flex-wrap > span');

    card.addEventListener('mouseenter', () => {
      pills.forEach((pill, i) => {
        /** @type {HTMLElement} */ (pill).style.transitionDelay = `${i * 30}ms`;
        pill.classList.add('pill-wave');
      });
    });

    card.addEventListener('mouseleave', () => {
      const len = pills.length;
      pills.forEach((pill, i) => {
        /** @type {HTMLElement} */ (pill).style.transitionDelay = `${(len - 1 - i) * 20}ms`;
        pill.classList.remove('pill-wave');
      });
      // Clean up transition delays after animation completes
      setTimeout(() => {
        pills.forEach(pill => {
          /** @type {HTMLElement} */ (pill).style.transitionDelay = '';
        });
      }, len * 20 + 300);
    });
  });
}

// ========== SKILL PILL ACTIVE TOGGLE ==========

function initSkillPillToggle() {
  document.querySelectorAll('.skill-category .flex-wrap > span').forEach(pill => {
    pill.addEventListener('click', (e) => {
      pill.classList.toggle('pill-active');

      // Ripple effect
      const el = /** @type {HTMLElement} */ (pill);
      const rect = el.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'pill-ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${/** @type {MouseEvent} */ (e).clientX - rect.left - size / 2}px`;
      ripple.style.top = `${/** @type {MouseEvent} */ (e).clientY - rect.top - size / 2}px`;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 400);
    });
  });
}

// ========== TIMELINE: CARD CLICK TOGGLE ==========

/**
 * Trigger staggered flip-in delays on tech stack badges.
 * @param {Element} card
 */
function triggerTechFlipIn(card) {
  card.querySelectorAll('.timeline-details .flex-wrap > span').forEach((badge, i) => {
    /** @type {HTMLElement} */ (badge).style.animationDelay = `${350 + i * 40}ms`;
  });
}

function initTimelineCardToggle() {
  document.querySelectorAll('.timeline-card').forEach(card => {
    card.addEventListener('click', () => {
      const el = /** @type {HTMLElement} */ (card);
      const item = el.closest('.timeline-item');
      // Only expand if card is "facing" (spiral-active) or revealed on mobile
      if (item && !item.classList.contains('spiral-active') && !item.classList.contains('mobile-revealed')) return;

      const isExpanding = !el.classList.contains('expanded');
      el.classList.toggle('expanded');
      if (isExpanding) triggerTechFlipIn(el);
    });
  });
}

// ========== SPIRAL TIMELINE: SCROLL-LINKED 3D ROTATION ==========

function initSpiralTimeline() {
  const container = document.querySelector('.timeline-spiral');
  const progressEl = document.getElementById('timeline-progress');
  if (!container) return;

  const items = /** @type {HTMLElement[]} */ (
    Array.from(container.querySelectorAll('.timeline-item'))
  );
  if (!items.length) return;

  // Mobile: simpler reveal with left-side path
  if (isMobile()) {
    initMobileSpiralReveal(container, items, progressEl);
    return;
  }

  if (prefersReducedMotion()) return;

  let rafId = 0;

  function update() {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const wh = window.innerHeight;
      const sweetSpot = wh * 0.45;

      // Progress line
      if (progressEl) {
        const rect = container.getBoundingClientRect();
        const scrollIn = wh - rect.top;
        const progress = Math.min(Math.max(scrollIn / rect.height, 0), 1);
        progressEl.style.transform = `translateX(-50%) scaleY(${progress})`;
      }

      items.forEach(item => {
        const card = /** @type {HTMLElement|null} */ (item.querySelector('.timeline-card'));
        if (!card) return;

        const rect = item.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        // dist: negative = above sweet spot, positive = below
        const dist = (cardCenter - sweetSpot) / (wh * 0.55);
        const clampedDist = Math.max(-1, Math.min(1, dist));

        const isLeft = item.classList.contains('timeline-left');
        let angle, scale, opacity, tz;

        if (clampedDist > 0) {
          // BELOW center → CLOSED (not yet reached by scroll)
          // Cards face toward the center line (like closed book pages)
          const closeFactor = Math.min(clampedDist, 1);
          angle = isLeft ? -closeFactor * 65 : closeFactor * 65;
          scale = 1 - closeFactor * 0.15;
          opacity = 1 - closeFactor * 0.75;
          tz = -closeFactor * 40;
        } else {
          // ABOVE center → OPEN (already scrolled past = opened)
          // Cards stay mostly flat, subtle "opened" tilt outward
          const openFactor = Math.min(Math.abs(clampedDist), 1);
          angle = isLeft ? openFactor * 8 : -openFactor * 8;
          scale = 1 - openFactor * 0.04;
          opacity = 1 - openFactor * 0.15;
          tz = -openFactor * 10;
        }

        card.style.transformOrigin = isLeft ? 'right center' : 'left center';
        card.style.transform = `perspective(1200px) rotateY(${angle}deg) scale(${scale}) translateZ(${tz}px)`;
        card.style.opacity = String(Math.max(opacity, 0.15));

        // "Facing" when near center (transitioning open)
        const isFacing = clampedDist > -0.25 && clampedDist < 0.25;
        item.classList.toggle('spiral-active', isFacing);
      });
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

// ========== MOBILE: LEFT-PATH SEQUENTIAL REVEAL ==========

function initMobileSpiralReveal(container, items, progressEl) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const item = /** @type {HTMLElement} */ (entry.target);
      if (entry.isIntersecting) {
        item.classList.add('mobile-revealed');
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px'
  });

  items.forEach(item => observer.observe(item));

  // Progress line on mobile
  if (progressEl) {
    let rafId = 0;
    function updateProgress() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const wh = window.innerHeight;
        const rect = container.getBoundingClientRect();
        const scrollIn = wh - rect.top;
        const progress = Math.min(Math.max(scrollIn / rect.height, 0), 1);
        progressEl.style.transform = `translateX(-50%) scaleY(${progress})`;
      });
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
}

// ========== PUBLIC API ==========

export function initInteractions() {
  initMagneticButtons();
  initContactMagnetic();
  initContactRipple();
  initStatPillHover();
  initSkillCardTilt();
  initSkillPillWave();
  initSkillPillToggle();
  initTimelineCardToggle();
  initSpiralTimeline();
}
