import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://vageez.github.io',
  base: '/math-perceptions',
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Math Perceptions',
      description: 'A visual, exam-focused math study guide.',
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        { label: 'Start Here', link: '/' },
        {
          label: 'Grade 10',
          items: [
            { label: 'Overview', link: '/levels/grade10/' },
            {
              label: 'Unit 1 — Linear Relations',
              items: [
                { autogenerate: { directory: 'levels/grade10/unit-1-linear-relations' } },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
