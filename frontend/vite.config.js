// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file from the parent directory
  const env = loadEnv(mode, process.cwd() + '/..', ''); 
  
  return {
    plugins: [react()],
    server: {
      host: true,         // 1. MUST BE TRUE: Exposes Vite to the Docker network
      port: 5173,         // 2. Enforces port 5173
      watch: {
        usePolling: true  // 3. Enables hot-reloading inside Docker volumes
      },
      proxy: {
        '/api': {
          // 4. FIX: Use 'backend' (the Docker service name) instead of 'localhost'
          target: `http://backend:5000`, 
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
