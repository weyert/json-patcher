import {defineConfig} from 'vite'
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig({
    build: {
        lib: {
            entry: './browser/diff_updater.js',
            name: 'diff-updater',
            fileName: 'index',
            formats: ['es']
        },
        outDir: 'browser',
        emptyOutDir: false
    },
    plugins: [
        wasm(),
        topLevelAwait(),
    ]
})
