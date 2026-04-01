/**
 * Scroll-driven animation system — hybrid approach.
 *
 * Uses IntersectionObserver to detect when elements enter/exit the viewport,
 * AND a rAF loop for continuous scroll-progress-driven interpolation of
 * hero parallax, timeline draw, and progress bar.
 *
 * Key design decisions:
 * - Elements that are already in viewport on page load → immediately visible
 * - Anchor navigation → IntersectionObserver fires instantly → elements shown
 * - Smooth scroll → elements animate gradually via CSS transitions
 * - When fully visible → inline styles cleared → CSS :hover works
 * - Bidirectional: elements animate out when scrolled away
 */

// ========== STATE ==========

let ticking = false;

/** @type {HTMLElement | null} */
let heroOuter = null;
/** @type {HTMLElement | null} */
let heroContentEl = null;
/** @type {HTMLElement | null} */
let scrollIndicator = null;
/** @type {HTMLElement[]} */
let parallaxEls = [];
/** @type {HTMLElement[]} */
let heroDepthEls = [];
/** @type {HTMLElement | null} */
let timelineProgressEl = null;
/** @type {HTMLElement | null} */
let timelineContainer = null;
/** @type {HTMLElement | null} */
let progressBarEl = null;
/** @type {HTMLElement | null} */
let backToTopEl = null;

// ========== TERMINAL TYPING STATE ==========

/** @type {{ timeouts: number[], originalHTML: Map<HTMLElement, string> } | null} */
let terminalBootState = null;

/** Schedule a timeout tracked by state for cleanup */
function scheduleTimeout(state, delay, fn) {
  const id = setTimeout(fn, delay);
  state.timeouts.push(id);
  return id;
}

/** Cancel all pending terminal timeouts */
function terminalBootCleanup() {
  if (!terminalBootState) return;
  for (const id of terminalBootState.timeouts) clearTimeout(id);
  terminalBootState.timeouts.length = 0;
}

/**
 * Terminal typing enter: CRT boot → character-by-character typing with cursor.
 * @param {HTMLElement} el - the terminal-boot container
 */
function terminalBootEnter(el) {
  // Reduced motion: instant show
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.classList.add('in-view');
    el.style.opacity = '1';
    el.querySelectorAll('[data-terminal-line]').forEach(child => {
      /** @type {HTMLElement} */ (child).style.opacity = '1';
      /** @type {HTMLElement} */ (child).style.transform = 'none';
      child.classList.add('in-view');
    });
    return;
  }

  terminalBootCleanup();

  const lines = /** @type {HTMLElement[]} */ (Array.from(el.querySelectorAll('[data-terminal-line]')));
  const state = { timeouts: [], originalHTML: new Map() };
  terminalBootState = state;

  // Cache original HTML for each line
  for (const line of lines) {
    state.originalHTML.set(line, line.innerHTML);
  }

  // Hide all lines
  for (const line of lines) {
    line.style.opacity = '0';
    line.style.transform = 'none';
    line.style.transition = 'none';
    line.classList.remove('in-view');
  }

  // Trigger CRT boot on container
  el.classList.add('in-view');
  el.style.opacity = '1';

  // Schedule typing pairs — all timeouts are FLAT (absolute from time 0)
  const CHAR_DELAY = 50;
  const OUTPUT_PAUSE = 150;
  const OUTPUT_FADE = 250;
  const PAIR_GAP = 200;
  const CRT_BOOT = 500;

  let t = CRT_BOOT; // absolute time cursor

  for (let pair = 0; pair < lines.length; pair += 2) {
    const cmdLine = lines[pair];
    const outputLine = lines[pair + 1];
    if (!cmdLine) break;

    // --- Command line: type character by character ---
    const prefixSpan = cmdLine.querySelector('.text-accent');
    const cmdSpan = cmdLine.querySelector('.text-text-primary');

    if (cmdSpan) {
      const fullText = cmdSpan.textContent || '';
      const prefixHTML = prefixSpan ? prefixSpan.outerHTML : '';

      // T+0: Show line with prefix + empty command span + cursor
      const showTime = t;
      scheduleTimeout(state, showTime, () => {
        if (terminalBootState !== state) return;
        cmdLine.style.opacity = '1';
        cmdLine.innerHTML = prefixHTML + '<span class="text-text-primary"></span><span class="typing-cursor"></span>';
      });

      // T+charDelay: Type each character one by one
      for (let c = 0; c < fullText.length; c++) {
        const charTime = t + (c + 1) * CHAR_DELAY;
        const slice = fullText.slice(0, c + 1);
        scheduleTimeout(state, charTime, () => {
          if (terminalBootState !== state) return;
          const target = cmdLine.querySelector('.text-text-primary');
          if (target) target.textContent = slice;
        });
      }

      const typingEnd = t + fullText.length * CHAR_DELAY;

      // Remove cursor after typing
      scheduleTimeout(state, typingEnd + 50, () => {
        if (terminalBootState !== state) return;
        const cur = cmdLine.querySelector('.typing-cursor');
        if (cur) cur.remove();
      });

      t = typingEnd + OUTPUT_PAUSE;
    } else {
      // No spans — just show the line
      scheduleTimeout(state, t, () => {
        if (terminalBootState !== state) return;
        cmdLine.style.opacity = '1';
      });
      t += 200;
    }

    // --- Output line: fade in ---
    if (outputLine) {
      const fadeStart = t;
      scheduleTimeout(state, fadeStart, () => {
        if (terminalBootState !== state) return;
        outputLine.style.transition = `opacity ${OUTPUT_FADE}ms ease`;
        outputLine.style.opacity = '1';
      });
      // Clear inline opacity so CSS class (opacity-80) takes effect
      scheduleTimeout(state, fadeStart + OUTPUT_FADE + 50, () => {
        if (terminalBootState !== state) return;
        outputLine.style.transition = '';
        outputLine.style.opacity = '';
        outputLine.classList.add('in-view');
      });
      t = fadeStart + OUTPUT_FADE + PAIR_GAP;
    }
  }
}

/**
 * Terminal typing exit: cancel all, restore original HTML.
 * @param {HTMLElement} el
 */
function terminalBootExit(el) {
  terminalBootCleanup();

  const lines = /** @type {HTMLElement[]} */ (Array.from(el.querySelectorAll('[data-terminal-line]')));

  if (terminalBootState) {
    // Restore original innerHTML
    for (const line of lines) {
      const orig = terminalBootState.originalHTML.get(line);
      if (orig !== undefined) line.innerHTML = orig;
    }
  }

  // Reset styles
  for (const line of lines) {
    line.style.opacity = '';
    line.style.transform = '';
    line.style.transition = '';
    line.classList.remove('in-view');
    const cur = line.querySelector('.typing-cursor');
    if (cur) cur.remove();
  }

  el.classList.remove('in-view');
  el.style.opacity = '';
  terminalBootState = null;
}

/**
 * Reset terminal typing (for i18n language switch).
 * Exits current animation, waits for DOM update, re-enters.
 */
export function resetTerminalTyping() {
  const el = document.querySelector('[data-scroll="terminal-boot"]');
  if (!el || !el.classList.contains('in-view')) return;
  const htmlEl = /** @type {HTMLElement} */ (el);
  terminalBootExit(htmlEl);
  setTimeout(() => terminalBootEnter(htmlEl), 50);
}

// ========== EASING ==========

const SPRING = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

// ========== INTERSECTION OBSERVER ANIMATIONS ==========

/**
 * Mark an element as visible: clear hidden styles, add .in-view.
 * Uses a microtask so the browser can batch DOM changes.
 * @param {HTMLElement} el
 */
function makeVisible(el) {
  el.style.opacity = '';
  el.style.transform = '';
  el.style.willChange = '';
  el.classList.add('in-view');
}

/**
 * Mark an element as hidden: add .out class, remove .in-view.
 * @param {HTMLElement} el
 */
function makeHidden(el) {
  el.classList.remove('in-view');
}

/**
 * Handle stagger-type containers entering the viewport.
 * @param {HTMLElement} el
 * @param {string} type
 */
function staggerEnter(el, type) {
  // Terminal boot has its own character-by-character typing system
  if (type === 'terminal-boot') { terminalBootEnter(el); return; }

  el.classList.add('in-view');
  el.style.opacity = '1';

  const childSel = '[data-stagger-child]';
  const children = el.querySelectorAll(childSel);

  children.forEach((child, i) => {
    const childEl = /** @type {HTMLElement} */ (child);
    let delay;

    if (type === 'cascade-3d') {
      const row = Math.floor(i / 3);
      const col = i % 3;
      delay = row * 180 + col * 90;
      childEl.style.setProperty('--stagger-i', String(i));
    } else {
      const baseDelay = parseInt(el.dataset.staggerDelay) || 80;
      delay = i * baseDelay;
    }

    childEl.style.transitionDelay = `${delay}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        childEl.classList.add('in-view');
      });
    });
  });
}

/**
 * Handle stagger-type containers exiting the viewport.
 * @param {HTMLElement} el
 * @param {string} type
 */
function staggerExit(el, type) {
  // Terminal boot has its own cleanup system
  if (type === 'terminal-boot') { terminalBootExit(el); return; }

  const children = el.querySelectorAll('[data-stagger-child]');
  const len = children.length;

  children.forEach((child, i) => {
    const childEl = /** @type {HTMLElement} */ (child);
    const delay = (len - 1 - i) * 40;
    childEl.style.transitionDelay = `${delay}ms`;
    childEl.classList.remove('in-view');
  });

  el.classList.remove('in-view');
}

/**
 * Force-reveal all elements that are already inside the viewport on init.
 * Critical for: page load with hash, anchor navigation, back-button.
 */
function revealVisibleOnInit() {
  const wh = window.innerHeight;
  document.querySelectorAll('[data-scroll]').forEach(rawEl => {
    const el = /** @type {HTMLElement} */ (rawEl);
    if (el.closest('#hero-outer')) return; // hero is handled separately

    const rect = el.getBoundingClientRect();
    // Element is at least partially in viewport
    if (rect.top < wh && rect.bottom > 0) {
      const type = el.dataset.scroll || '';
      const isContainer = ['stagger', 'cascade-3d', 'bounce-stagger', 'deal-cards', 'terminal-boot'].includes(type);

      if (isContainer) {
        // Immediately show container and all children (no stagger delay on init)
        el.classList.add('in-view');
        el.style.opacity = '1';
        const childSel = type === 'terminal-boot' ? '[data-terminal-line]' : '[data-stagger-child]';
        el.querySelectorAll(childSel).forEach(child => {
          /** @type {HTMLElement} */ (child).style.transitionDelay = '0ms';
          child.classList.add('in-view');
        });
      } else {
        makeVisible(el);
      }
    }
  });
}

// ========== INIT: SCROLL ANIMATIONS ==========

export function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Force everything visible, no animations
    document.querySelectorAll('[data-scroll], [data-stagger-child], [data-terminal-line]').forEach(el => {
      /** @type {HTMLElement} */ (el).style.opacity = '1';
      /** @type {HTMLElement} */ (el).style.transform = 'none';
      el.classList.add('in-view');
    });
    return;
  }

  // Set up the observer
  const scrollEls = document.querySelectorAll('[data-scroll]:not([data-scroll="parallax"])');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = /** @type {HTMLElement} */ (entry.target);
      const type = el.dataset.scroll || '';
      const isHero = el.closest('#hero-outer');
      const isContainer = ['stagger', 'cascade-3d', 'bounce-stagger', 'deal-cards', 'terminal-boot'].includes(type);

      if (entry.isIntersecting) {
        if (isContainer) {
          staggerEnter(el, type);
        } else {
          makeVisible(el);
        }
        // One-shot section glow on #contact
        if (el.id === 'contact' && !el.classList.contains('section-entered')) {
          el.classList.add('section-entered');
        }
        // Hero elements are one-shot (rAF handles their fade)
        if (isHero) observer.unobserve(el);
      } else {
        if (isHero) return;
        if (isContainer) {
          staggerExit(el, type);
        } else {
          makeHidden(el);
        }
      }
    });
  }, {
    threshold: [0, 0.12],
    rootMargin: '0px 0px -60px 0px'
  });

  scrollEls.forEach(el => observer.observe(el));

  // Force-reveal anything already in viewport (handles hash navigation, page refresh mid-scroll)
  requestAnimationFrame(() => revealVisibleOnInit());

  // Also re-check on hashchange (anchor link clicks)
  window.addEventListener('hashchange', () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => revealVisibleOnInit());
    });
  });
}

// ========== HOVER GLOW ==========

export function initHoverGlow() {
  document.querySelectorAll('.hover-glow').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      /** @type {HTMLElement} */ (el).style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      /** @type {HTMLElement} */ (el).style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  });
}

// ========== CONTINUOUS rAF LOOP ==========

export function initScrollProgress() {
  heroOuter = document.getElementById('hero-outer');
  heroContentEl = document.querySelector('.hero-content');
  scrollIndicator = document.querySelector('.scroll-indicator');
  parallaxEls = /** @type {HTMLElement[]} */ (Array.from(document.querySelectorAll('[data-scroll="parallax"]')));
  timelineProgressEl = document.getElementById('timeline-progress');
  timelineContainer = document.querySelector('.timeline');
  progressBarEl = document.getElementById('scroll-progress');
  backToTopEl = document.getElementById('back-to-top');
  heroDepthEls = /** @type {HTMLElement[]} */ (Array.from(document.querySelectorAll('[data-hero-depth]')));

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(update);
    ticking = true;
  }
}

function update() {
  ticking = false;
  const sy = window.scrollY;
  const wh = window.innerHeight;
  const docH = document.documentElement.scrollHeight - wh;

  // --- Scroll progress bar ---
  if (progressBarEl && docH > 0) {
    progressBarEl.style.transform = `scaleX(${Math.min(sy / docH, 1)})`;
  }

  // --- Hero depth parallax ---
  if (heroOuter && heroContentEl) {
    const heroH = heroOuter.offsetHeight;

    if (heroDepthEls.length > 0 && wh >= 768) {
      for (const el of heroDepthEls) {
        const depth = parseFloat(el.dataset.heroDepth) || 0.5;
        const p = Math.min(Math.max(sy / (heroH * 0.4 * depth), 0), 1);
        el.style.opacity = String(1 - p);
        el.style.transform = `translateY(${p * -30}px)`;
      }
      heroContentEl.style.opacity = '1';
      heroContentEl.style.transform = 'none';
    } else {
      const progress = Math.min(Math.max(sy / (heroH * 0.6), 0), 1);
      heroContentEl.style.opacity = String(1 - progress);
      heroContentEl.style.transform = `scale(${1 - progress * 0.08})`;
    }

    if (scrollIndicator) {
      const fadeProgress = Math.min(Math.max(sy / (heroH * 0.6), 0), 1);
      scrollIndicator.style.opacity = String(Math.max(1 - fadeProgress * 5, 0));
    }
  }

  // --- Parallax ---
  for (const el of parallaxEls) {
    const speed = parseFloat(el.dataset.speed) || 0.3;
    const rect = el.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - wh / 2) * speed;
    el.style.transform = `translateY(${offset}px)`;
  }

  // --- Timeline line draw ---
  if (timelineProgressEl && timelineContainer) {
    const rect = timelineContainer.getBoundingClientRect();
    const start = rect.top + sy;
    const scrollIn = sy + wh - start;
    const progress = Math.min(Math.max(scrollIn / rect.height, 0), 1);
    timelineProgressEl.style.transform = `scaleY(${progress})`;
  }

  // --- Back-to-top ---
  if (backToTopEl) {
    const heroH = heroOuter ? heroOuter.offsetHeight : wh;
    backToTopEl.classList.toggle('visible', sy > heroH);
  }
}

// ========== BACK-TO-TOP BUTTON ==========

export function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== ANCHOR NAVIGATION OFFSET ==========

export function initAnchorOffset() {
  // Handle anchor clicks: offset for sticky hero / navbar
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (href === '#hero') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navbarH = document.getElementById('navbar')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarH - 16;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    });
  });
}
