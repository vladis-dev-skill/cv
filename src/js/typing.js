/**
 * Typing animation module.
 * Creates a typewriter effect that cycles through localized phrases.
 */

import { getLang, getLocale } from './i18n.js';

/** @type {number | null} */
let typingTimeout = null;

/**
 * Start the typing animation in the #typing-text element.
 * Automatically picks phrases from the current locale.
 */
export function initTyping() {
  stopTyping();

  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = /** @type {string[]} */ (getLocale(getLang()).typing_phrases);
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
      charIdx--;
      el.textContent = currentPhrase.substring(0, charIdx);
    } else {
      charIdx++;
      el.textContent = currentPhrase.substring(0, charIdx);
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 500;
    }

    typingTimeout = setTimeout(type, delay);
  }

  type();
}

/** Stop the typing animation and clear the pending timeout. */
export function stopTyping() {
  if (typingTimeout) {
    clearTimeout(typingTimeout);
    typingTimeout = null;
  }
}
