import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically opens the browser on `npm run dev`
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor';
            if (id.includes('d3')) return 'd3-vendor';
            if (id.includes('react-select')) return 'select-vendor';
            if (id.includes('papaparse')) return 'csv-vendor';
            return 'vendor'; // fallback for all other node_modules
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: Raise warning limit (default is 500kB)
  },
});










// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     open: true, // This opens the browser on `npm run dev`
//   }
// })
