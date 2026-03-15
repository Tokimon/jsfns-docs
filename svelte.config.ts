import adapter from '@sveltejs/adapter-static';
import { getVersions } from './src/lib/data/versions.js';

const entries = ['*'];
for (const [pkg, vers] of Object.entries(getVersions())) {
	for (const v of vers) {
		entries.push(`/${pkg}/${v}`);
	}
}

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
	},
};

export default config;
