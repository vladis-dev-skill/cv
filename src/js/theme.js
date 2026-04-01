/**
 * Theme module.
 * Manages dark/light theme toggle with icon animation,
 * persists choice to localStorage, and syncs with grid background.
 */

import { updateGridTheme } from './grid-bg.js';

/** @typedef {'dark' | 'light'} Theme */

/** @type {Theme} */
let currentTheme = /** @type {Theme} */ (localStorage.getItem('cv-theme')) ||
  (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

/**
 * Apply a theme to the page: updates data-theme, icon, and grid background.
 * @param {Theme} theme
 */
export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  currentTheme = theme;
  localStorage.setItem('cv-theme', theme);

  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.style.transition = 'transform 0.4s ease';
    icon.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
      icon.style.transform = 'rotate(0deg)';
    }, 200);
  }

  updateGridTheme(theme);
}

/** Initialize theme: apply saved preference, enable transitions, bind toggle. */
export function initTheme() {
  applyTheme(currentTheme);

  // Enable transitions after initial paint to prevent FOUC
  requestAnimationFrame(() => {
    document.documentElement.classList.add('theme-ready');
  });

  document.getElementById('theme-toggle').addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });
}

/** @returns {Theme} */
export function getTheme() {
  return currentTheme;
}
