import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Change this to '/repository-name/' if your app is hosted in a subdirectory
  build: {
    outDir: 'dist',
  },
});
