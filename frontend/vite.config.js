// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load env file from the parent directory
  const env = loadEnv(mode, process.cwd() + '/..', ''); 
  const targetPort = env.VITE_API_PORT || 5000;

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': `http://localhost:${targetPort}` // Uses port from global .env
      }
    }
  }
})
