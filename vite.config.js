import { defineConfig } from 'vite';

/**
 * Сборка портфолио. Tailwind убран: разметка перешла на собственный
 * CSS-слой (~10 КБ), фреймворк-раннер в пайплайне больше не нужен.
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  base: './',
  build: { outDir: 'dist' },
  server: { open: true, port: 3000 },
});
