import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

import postcssPresetEnv from "postcss-preset-env";

export default defineConfig({
    plugins: [
        react(),
        legacy({
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
        }),
    ],
    base: "./",
    build: {
        outDir: "./build",
    },
    css: {
        postcss: {
            plugins: [postcssPresetEnv({})],
        },
        modules: {
            localsConvention: "dashesOnly",
        },
    },
});
