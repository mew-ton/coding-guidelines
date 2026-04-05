import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSkills from 'starlight-skills';

export default defineConfig({
  site: 'https://mew-ton.github.io',
  base: '/coding-guidelines',
  integrations: [
    starlight({
      title: 'Coding Guidelines',
      plugins: [
        starlightSkills(),
      ],
    }),
  ],
});
