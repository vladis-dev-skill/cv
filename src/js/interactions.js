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

  document.querySelectorAll('.contact-icon-link').forEach(link => {
    const el = /** @type {HTMLElement} */ (link);
    let rafId = 0;

    el.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = Math.max(-6, Math.min(6, (e.clientX - cx) * 0.2));
        const dy = Math.max(-6, Math.min(6, (e.clientY - cy) * 0.2));
        el.style.transform = `translate(${dx}px, ${dy}px) translateY(-3px)`;
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

// ========== SHARED ==========

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ========== SKILL PILL WAVE ON CARD HOVER ==========

function initSkillPillWave() {
  if (isMobile() || prefersReducedMotion()) return;

  document.querySelectorAll('.skill-category').forEach(card => {
    const pills = card.querySelectorAll('.skill-pill');

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
  document.querySelectorAll('.skill-category .skill-pill').forEach(pill => {
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
 * Stagger the tech-stack badge fade-in so it tracks the panel opening
 * (small, synchronized delays — no big offset that desyncs from the grid reveal).
 * @param {Element} card
 */
function triggerTechFlipIn(card) {
  card.querySelectorAll('.timeline-details .flex-wrap > span').forEach((badge, i) => {
    /** @type {HTMLElement} */ (badge).style.animationDelay = `${120 + i * 25}ms`;
  });
}

function initTimelineCardToggle() {
  const allCards = document.querySelectorAll('.timeline-card');

  allCards.forEach(card => {
    card.addEventListener('click', () => {
      const el = /** @type {HTMLElement} */ (card);
      const isExpanding = !el.classList.contains('expanded');

      // Accordion: close all others first
      if (isExpanding) {
        allCards.forEach(other => {
          if (other !== card && other.classList.contains('expanded')) {
            other.classList.remove('expanded');
          }
        });
      }

      el.classList.toggle('expanded');

      if (isExpanding) {
        triggerTechFlipIn(el);
        // Scroll card into comfortable reading position
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });
}

// ========== TIMELINE: SCROLL-LINKED FOCUS (gentle dim/scale, no 3D) ==========

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

        // Expanded card stays fully focused and flat — never dimmed.
        if (card.classList.contains('expanded')) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          item.classList.add('spiral-active');
          return;
        }

        // Distance from the viewport sweet spot, 0 (centered) → 1 (far).
        const rect = item.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = (cardCenter - sweetSpot) / (wh * 0.55);
        const factor = Math.min(Math.abs(dist), 1);

        // Gentle focus: centered card is crisp, off-center cards dim and shrink
        // slightly. No rotation / perspective / translateZ — flat and cheap.
        const opacity = Math.max(1 - factor * 0.5, 0.5);
        const scale = 1 - factor * 0.04;
        card.style.opacity = String(opacity);
        card.style.transform = `scale(${scale})`;

        item.classList.toggle('spiral-active', factor < 0.3);
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
  initStatPillHover();
  initSkillPillWave();
  initSkillPillToggle();
  initTimelineCardToggle();
  initSpiralTimeline();
}
