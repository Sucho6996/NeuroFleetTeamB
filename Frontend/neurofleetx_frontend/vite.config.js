import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Use port 3000 to match backend CORS config, or keep 5173 if you update backend CORS
    port: 3000,
    proxy: {
      '/user': {
        target: 'http://localhost:8081', // UserService runs on port 8081 (from application.properties)
        changeOrigin: true,
        secure: false,
      },
      '/admin': {
        target: 'http://localhost:8083', // Admin service runs on port 8083
        changeOrigin: true,
        secure: false,
      },
      '/fleetManager': {
        target: 'http://localhost:8084', // FleetManager runs on port 8081
        changeOrigin: true,
        secure: false,
      },
      '/driver': {
        target: 'http://localhost:8082', // Driver service runs on port 8082
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

