// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.genaisystemdesign.com',
	markdown: {
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
		},
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, {
				behavior: 'prepend',
				properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
				content: {
					type: 'text',
					value: '#',
				},
			}],
		],
	},
	integrations: [
		mdx(),
		sitemap({
			filter: (page) => !page.includes('/rss.xml'),
			serialize(item) {
				item.lastmod = new Date().toISOString();
				return item;
			},
		}),
	],
});
