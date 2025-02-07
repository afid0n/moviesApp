import { defineConfig } from "vite";
 
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
              main: "index.html",
              favorites: "favorites.html",
              add: "add.html",
              details: "details.html",
              edit: "edit.html",
            }
        }
    }
})