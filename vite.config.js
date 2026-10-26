import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Chemins relatifs : le site marche aussi dans un sous-dossier (GitHub Pages : /craie-sonore/)
  base: './',
})
