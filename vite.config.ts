import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    port: 5173,
    host: "localhost",
  },
});
