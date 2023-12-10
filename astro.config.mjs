import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [tailwind(), svelte()],
  output: 'server',
  server: {
    port: 3000
  },
  adapter: node({
    mode: 'standalone',
  }),
});