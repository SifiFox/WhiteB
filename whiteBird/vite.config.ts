import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import path from 'path';
import analyzer from 'vite-bundle-analyzer';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackRouter({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    analyzer(),
    ViteMinifyPlugin({}),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@/shared', replacement: path.resolve(__dirname, 'src/shared') },
      { find: '@/routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@/assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@/app', replacement: path.resolve(__dirname, 'src/app') },
    ],
  },
});
