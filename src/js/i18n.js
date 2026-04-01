/**
 * Internationalization module.
 * Manages language switching and applies translations to DOM elements
 * marked with [data-i18n] attributes.
 */

import en from '../i18n/en.js';
import ru from '../i18n/ru.js';

/**
 * @typedef {'en' | 'ru'} Lang
 * @typedef {Record<string, string | string[]>} LocaleData
 * @typedef {(lang: Lang) => void} LangChangeCallback
 */

/** @type {Record<Lang, LocaleData>} */
const locales = { en, ru };

/** @type {Lang} */
let currentLang = /** @type {Lang} */ (localStorage.getItem('cv-lang')) || 'en';

/** @type {LangChangeCallback | null} */
let onLangChange = null;

/**
 * Apply a language to the page: updates all [data-i18n] elements,
 * sets <html> lang attribute, and persists the choice.
 * @param {Lang} lang
 */
export function applyLang(lang) {
  currentLang = lang;
  document.documentElement.dataset.lang = lang;
  document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';
  localStorage.setItem('cv-lang', lang);

  const data = locales[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (data[key] !== undefined) {
      el.innerHTML = data[key];
    }
  });

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = lang === 'en' ? 'EN' : 'RU';

  if (onLangChange) onLangChange(lang);
}

/**
 * Initialize i18n: apply saved language and bind the toggle button.
 * @param {LangChangeCallback} langChangeCallback — called after every language switch
 */
export function initI18n(langChangeCallback) {
  onLangChange = langChangeCallback;
  applyLang(currentLang);

  document.getElementById('lang-toggle').addEventListener('click', () => {
    applyLang(currentLang === 'en' ? 'ru' : 'en');
  });
}

/** @returns {Lang} */
export function getLang() {
  return currentLang;
}

/**
 * Get the locale dictionary for a given language.
 * @param {Lang} [lang] — defaults to current language
 * @returns {LocaleData}
 */
export function getLocale(lang) {
  return locales[lang || currentLang];
}
