import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // Add this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { // Add this block
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
