import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@components": fileURLToPath(
            new URL("./src/components", import.meta.url)
        ),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@context": fileURLToPath(
            new URL("./src/context", import.meta.url)
        ),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@data": fileURLToPath(new URL("./src/data", import.meta.url))
    },
},
})

