/**
 * Interactive dot-grid background with connector lines.
 * Draws on a <canvas> behind the hero section — lightweight alternative to tsParticles.
 * Features: mouse-reactive glow, random pulse nodes, scroll parallax, theme-aware colors.
 */

/** @type {HTMLCanvasElement | null} */
let canvas;
/** @type {CanvasRenderingContext2D | null} */
let ctx;
/** @type {Dot[]} */
let dots;
/** @type {[number, number][]} */
let connectors;
/** @type {{ x: number | null, y: number | null }} */
let mouse;
/** @type {number} */
let raf;
/** @type {boolean} */
let isDark = true;
/** @type {number} */
let scrollY = 0;
/** @type {boolean} */
let isReducedMotion = false;
/** @type {boolean} */
let isInitialized = false;

/**
 * @typedef {{
 *   x: number, y: number,
 *   baseX: number, baseY: number,
 *   radius: number, opacity: number,
 *   pulse: number,
 *   col: number, row: number
 * }} Dot
 */

/**
 * @typedef {{
 *   dot: string,
 *   glow: string,
 *   connector: string
 * }} GridColors
 */

/** Grid layout and visual tuning constants. */
const CONFIG = {
  dotSpacingDesktop: 60,
  dotSpacingMobile: 80,
  dotRadius: 1.5,
  dotBaseOpacity: 0.12,
  dotGlowOpacity: 0.6,
  mouseRadius: 180,
  connectorOpacity: 0.08,
  connectorGlowOpacity: 0.25,
  pulseInterval: 2500,
  pulseCount: 3,
  parallaxFactor: 0.15,
  lineWidth: 0.8,
};

/** @returns {GridColors} */
function getColors() {
  return isDark
    ? { dot: '16, 185, 129', glow: '16, 185, 129', connector: '16, 185, 129' }
    : { dot: '5, 150, 105', glow: '16, 185, 129', connector: '5, 150, 105' };
}

function createDots() {
  const isMobile = window.innerWidth < 768;
  const spacing = isMobile ? CONFIG.dotSpacingMobile : CONFIG.dotSpacingDesktop;
  const cols = Math.ceil(canvas.width / spacing) + 1;
  const rows = Math.ceil(canvas.height / spacing) + 1;
  const offsetX = (canvas.width - (cols - 1) * spacing) / 2;
  const offsetY = (canvas.height - (rows - 1) * spacing) / 2;

  dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({
        x: offsetX + c * spacing,
        y: offsetY + r * spacing,
        baseX: offsetX + c * spacing,
        baseY: offsetY + r * spacing,
        radius: CONFIG.dotRadius,
        opacity: CONFIG.dotBaseOpacity,
        pulse: 0,
        col: c,
        row: r,
      });
    }
  }

  connectors = [];
  const connectorChance = isMobile ? 0.15 : 0.2;
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    const rightIdx = i + 1;
    if (d.col < cols - 1 && rightIdx < dots.length && Math.random() < connectorChance) {
      connectors.push([i, rightIdx]);
    }
    const bottomIdx = i + cols;
    if (d.row < rows - 1 && bottomIdx < dots.length && Math.random() < connectorChance) {
      connectors.push([i, bottomIdx]);
    }
  }
}

function resize() {
  const container = canvas.parentElement;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = container.offsetWidth * dpr;
  canvas.height = container.offsetHeight * dpr;
  canvas.style.width = container.offsetWidth + 'px';
  canvas.style.height = container.offsetHeight + 'px';
  ctx.scale(dpr, dpr);
  createDots();
}

function triggerPulses() {
  if (isReducedMotion || !dots || dots.length === 0) return;
  for (let i = 0; i < CONFIG.pulseCount; i++) {
    const idx = Math.floor(Math.random() * dots.length);
    dots[idx].pulse = 1;
  }
}

function draw() {
  if (!ctx || !dots) return;

  const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
  const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
  ctx.clearRect(0, 0, w, h);

  const colors = getColors();
  const parallaxOffset = scrollY * CONFIG.parallaxFactor;
  const isMobile = window.innerWidth < 768;

  // Draw connectors
  ctx.lineWidth = CONFIG.lineWidth;
  for (const [ai, bi] of connectors) {
    const a = dots[ai];
    const b = dots[bi];
    const ay = a.baseY - parallaxOffset;
    const by = b.baseY - parallaxOffset;

    let opacity = CONFIG.connectorOpacity;
    if (!isMobile && mouse.x !== null) {
      const mx = (a.baseX + b.baseX) / 2;
      const my = (ay + by) / 2;
      const dist = Math.hypot(mouse.x - mx, mouse.y - my);
      if (dist < CONFIG.mouseRadius) {
        const factor = 1 - dist / CONFIG.mouseRadius;
        opacity = CONFIG.connectorOpacity + (CONFIG.connectorGlowOpacity - CONFIG.connectorOpacity) * factor;
      }
    }

    ctx.strokeStyle = `rgba(${colors.connector}, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(a.baseX, ay);
    ctx.lineTo(b.baseX, by);
    ctx.stroke();
  }

  // Draw dots
  for (const dot of dots) {
    const dy = dot.baseY - parallaxOffset;
    let opacity = CONFIG.dotBaseOpacity;
    let radius = dot.radius;

    if (!isMobile && mouse.x !== null) {
      const dist = Math.hypot(mouse.x - dot.baseX, mouse.y - dy);
      if (dist < CONFIG.mouseRadius) {
        const factor = 1 - dist / CONFIG.mouseRadius;
        opacity = CONFIG.dotBaseOpacity + (CONFIG.dotGlowOpacity - CONFIG.dotBaseOpacity) * factor * factor;
        radius = dot.radius + factor * 1.5;
      }
    }

    if (dot.pulse > 0) {
      opacity = Math.max(opacity, dot.pulse * 0.7);
      radius = Math.max(radius, dot.radius + dot.pulse * 3);
      dot.pulse -= 0.015;
      if (dot.pulse < 0) dot.pulse = 0;
    }

    ctx.fillStyle = `rgba(${colors.dot}, ${opacity})`;
    ctx.beginPath();
    ctx.arc(dot.baseX, dy, radius, 0, Math.PI * 2);
    ctx.fill();

    if (opacity > 0.3) {
      ctx.fillStyle = `rgba(${colors.glow}, ${opacity * 0.3})`;
      ctx.beginPath();
      ctx.arc(dot.baseX, dy, radius * 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  raf = requestAnimationFrame(draw);
}

/** Initialize the interactive grid canvas background. */
export function initGridBackground() {
  isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('grid-canvas'));
  if (!canvas) return;

  ctx = canvas.getContext('2d');
  mouse = { x: null, y: null };

  isDark = document.documentElement.dataset.theme !== 'light';

  resize();

  if (isReducedMotion) {
    draw();
    cancelAnimationFrame(raf);
    return;
  }

  const isMobile = window.innerWidth < 768;
  if (!isMobile) {
    canvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = canvas.parentElement.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.parentElement.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });

  setInterval(triggerPulses, CONFIG.pulseInterval);

  /** @type {number} */
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  draw();
  isInitialized = true;
}

/**
 * Update grid colors when theme changes.
 * @param {string} theme — 'dark' or 'light'
 */
export function updateGridTheme(theme) {
  isDark = theme !== 'light';
  if (isReducedMotion && ctx && dots) {
    cancelAnimationFrame(raf);
    const w = canvas.width / (Math.min(window.devicePixelRatio || 1, 2));
    const h = canvas.height / (Math.min(window.devicePixelRatio || 1, 2));
    ctx.clearRect(0, 0, w, h);
    draw();
    cancelAnimationFrame(raf);
  }
}
