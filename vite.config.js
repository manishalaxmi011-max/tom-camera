import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('firebase')) {
                            return 'firebase';
                        }
                        if (id.includes('framer-motion')) {
                            return 'framer-motion';
                        }
                        if (id.includes('gsap')) {
                            return 'gsap';
                        }
                        if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                            return 'react-vendor';
                        }
                        if (id.includes('lucide-react')) {
                            return 'lucide';
                        }
                        return 'vendor'; // all other package goes here
                    }
                }
            }
        },
        chunkSizeWarningLimit: 1000 // Increase limit slightly as well to avoid warnings for reasonably sized chunks
    }
})
