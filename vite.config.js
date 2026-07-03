import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Relative paths + single-file bundle so dist/index.html opens by double-click (file://)
  base: './',
  plugins: [react(), viteSingleFile()],
})
