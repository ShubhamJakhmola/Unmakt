import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // explicitly disable source maps for production builds to avoid exposing
    // original source in developer tools. Vite defaults to false, but set
    // explicitly to be safe.
    sourcemap: false
  }
});
