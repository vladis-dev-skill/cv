/**
 * Application entry point.
 * Initializes all modules after DOM is ready.
 */

import '../css/main.css';
import { initTheme } from './theme.js';
import { initI18n } from './i18n.js';
import { initNav } from './nav.js';
import { initTyping, stopTyping } from './typing.js';
import { initCounters } from './counters.js';
import { initGridBackground } from './grid-bg.js';
import { initScrollAnimations, initScrollProgress, initHoverGlow, initBackToTop, initAnchorOffset, resetTerminalTyping } from './scroll.js';
import { initInteractions } from './interactions.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n((lang) => {
    stopTyping();
    initTyping();
    resetTerminalTyping();
  });
  initNav();
  initTyping();
  initScrollAnimations();
  initScrollProgress();
  initHoverGlow();
  initBackToTop();
  initAnchorOffset();
  initInteractions();
  initCounters();
  initGridBackground();
});
