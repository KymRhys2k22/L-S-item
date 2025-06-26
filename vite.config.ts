import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_ENV__: process.env.VITE_VERCEL_ENV,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
