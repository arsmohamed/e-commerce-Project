import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    hmr: {
      overlay: true,
    },
    proxy: {
      "/graphql": {
        target: "http://localhost:1337", // 👈 Strapi backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
