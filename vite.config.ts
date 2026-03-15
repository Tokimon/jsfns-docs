import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { getVersions } from './src/lib/data/versions.js';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__VERSIONS__: JSON.stringify(getVersions()),
	},
	ssr: {
		noExternal: ['@jsfns/core', '@jsfns/web'],
	},
});
