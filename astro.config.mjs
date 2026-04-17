import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://m4xshen.dev',
  integrations: [mdx(), sitemap(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  redirects: {
    '/posts/promote-open-source-project': '/posts/how-to-promote-side-project',
  },
  trailingSlash: 'never',
});
