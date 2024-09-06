import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
	root: "src",
	server: {
		proxy: {
			"/api": {
				target: "http://172.25.220.64:61016",
				changeOrigin: true
			},
		},
		host: true
	},
	plugins: [
		vue(),
	],
	build: {
		outDir: "dist/build/client",
		emptyOutDir: true,
		rollupOptions: {
			input: {
				"legal/Impressum": resolve(__dirname, "legal/Impressum.html"),
				"legal/Datenschutz": resolve(__dirname, "legal/Datenschutz.html"),
				admin: resolve(__dirname, "admin.html")
			}
		}
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	}
})
