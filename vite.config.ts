import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true
  },
  base: '/simulateur-solaire-v2/'
});
