/**
 * Counter animation module.
 * Animates numeric counters with easeOutCubic easing when they scroll into view.
 * Also handles the GPA ring reveal animation.
 */

/** @param {number} t — progress 0..1 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/** @param {number} t — progress 0..1 — slight overshoot for small numbers */
function easeOutBack(t) {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2);
}

/**
 * Animate a single counter element from 0 to its [data-counter] target.
 * @param {HTMLElement} el — must have data-counter (target number) and optional data-suffix
 */
function animateCounter(el) {
  const target = parseInt(el.dataset.counter);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  /** @param {number} now */
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easing = target < 50 ? easeOutBack : easeOutCubic;
    const current = Math.min(Math.round(easing(progress) * target), target);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/** Initialize all [data-counter] elements with scroll-triggered animation. */
export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(/** @type {HTMLElement} */ (entry.target));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  counters.forEach(c => observer.observe(c));
}

/** Initialize the GPA ring reveal on scroll. */
export function initGPA() {
  const ring = document.getElementById('gpa-ring');
  if (!ring) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        ring.classList.add('visible');
        observer.unobserve(ring);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(ring);
}
