import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [tailwindcss()],
  base: './',
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
  server: {
    open: true,
    port: 3000,
  },
});
