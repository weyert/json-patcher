import {defineConfig} from 'vite'
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig({
    build: {
        lib: {
            entry: './artifacts/diff_updater.js',
            name: 'diff-updater',
            fileName: 'browser',
            formats: ['es']
        },
        outDir: 'artifacts',
        emptyOutDir: false
    },
    plugins: [
        wasm(),
        topLevelAwait(),
    ]
})
