import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const ASSET_URL = process.env.ASSET_URL || '';



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: `${ASSET_URL}`,
});
