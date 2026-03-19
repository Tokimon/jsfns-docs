import adapter from '@sveltejs/adapter-static';
import { getVersions } from './src/lib/data/versions.ts';

const entries = ['*'];
for (const [pkg, vers] of Object.entries(getVersions())) {
	for (const v of vers) {
		entries.push(`/${pkg}/${v}`);
	}
}

const basePath = process.env.BASE_PATH || '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: undefined,
			precompress: false,
			strict: true,
		}),
		prerender: {
			entries,
		},
		paths: {
			base: basePath,
		},
	},
};

export default config;
