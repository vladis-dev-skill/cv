/**
 * Точка входа портфолио.
 *
 * Один модуль вместо восьми. Принципы:
 *  — ноль постоянных rAF-циклов: анимация живёт только пока что-то реально движется;
 *  — два IntersectionObserver на весь сайт (появление блоков + активная ссылка в меню);
 *  — один passive-слушатель скролла, дросселированный через rAF;
 *  — всё декоративное движение выключается при prefers-reduced-motion.
 */

import '../css/main.css';
import ru from '../i18n/ru.js';
import en from '../i18n/en.js';

const locales = { ru, en };
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────── ТЕМА ─────────────────────────── */

function initTheme() {
  const saved = localStorage.getItem('cv-theme');
  const initial = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.dataset.theme = initial;

  $('#theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('cv-theme', next);
  });
}

/* ─────────────────────────── ЯЗЫК ─────────────────────────── */

function applyLang(lang) {
  const dict = locales[lang];
  document.documentElement.lang = lang;
  localStorage.setItem('cv-lang', lang);

  for (const el of $$('[data-i18n]')) {
    const value = dict[el.dataset.i18n];
    if (value !== undefined) el.innerHTML = value;
  }

  // Счётчики: единица измерения тоже локализуется — перерисовываем их значение.
  for (const el of $$('[data-count]')) {
    if (el.dataset.unit) el.dataset.suffix = dict[el.dataset.unit] || '';
    el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || '');
  }
}

function initI18n() {
  const saved = localStorage.getItem('cv-lang');
  const guess = (navigator.language || '').toLowerCase().startsWith('ru') ? 'ru' : 'en';
  let lang = saved === 'ru' || saved === 'en' ? saved : guess;
  applyLang(lang);

  $('#lang-toggle').addEventListener('click', () => {
    lang = lang === 'ru' ? 'en' : 'ru';
    applyLang(lang);
  });
}

/* ─────────────────────── МЕНЮ И НАВИГАЦИЯ ─────────────────────── */

function initNav() {
  const burger = $('#nav-burger');
  const links = $('#nav-links');

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });

  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Активный пункт меню: наблюдаем секции, а не считаем позиции на каждом кадре.
  const map = new Map();
  for (const a of $$('#nav-links a')) {
    const section = document.querySelector(a.getAttribute('href'));
    if (section) map.set(section, a);
  }

  const spy = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const a of map.values()) a.classList.remove('on');
      map.get(entry.target).classList.add('on');
    }
  }, { rootMargin: '-45% 0px -50% 0px' });

  for (const section of map.keys()) spy.observe(section);
}

/* ──────────────── ПОЯВЛЕНИЕ БЛОКОВ И СЧЁТЧИКИ ──────────────── */

function countUp(el) {
  const target = Number(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 900;
  const start = performance.now();

  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initReveal() {
  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);            // однократно: без ре-анимации при обратном скролле
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  for (const el of $$('.reveal')) io.observe(el);

  if (reduceMotion) return;

  const counters = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      countUp(entry.target);
      obs.unobserve(entry.target);
    }
  }, { threshold: 0.6 });

  for (const el of $$('[data-count]')) counters.observe(el);
}

/* ──────────────── ПРОГРЕСС И КНОПКА «НАВЕРХ» ──────────────── */

function initScroll() {
  const bar = $('#nav-progress');
  const top = $('#to-top');
  let ticking = false;

  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const progress = max > 0 ? scrollY / max : 0;
    bar.style.width = (progress * 100).toFixed(2) + '%';
    top.classList.toggle('on', scrollY > innerHeight * 0.8);
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });

  update();
}

/* ─────────────────────────── СТАРТ ─────────────────────────── */

initTheme();
initI18n();
initNav();
initReveal();
initScroll();
