// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

   server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'config': path.resolve(__dirname, './src/config'),
      'ui-component': path.resolve(__dirname, './src/ui-component'),
      'store': path.resolve(__dirname, './src/store'),
      'assets': path.resolve(__dirname, './src/assets'),
      'layout': path.resolve(__dirname, './src/layout')
    }
  }
});
