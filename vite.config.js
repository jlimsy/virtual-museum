import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/virtual-museum/",
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
});
