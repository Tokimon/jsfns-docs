import path from 'node:path';
import { type BuildOptions, build } from 'esbuild';

export async function buildJS() {
	const options: BuildOptions = {
		entryPoints: [path.resolve('assets/js/index.ts')],
		bundle: true,
		minify: true,
		sourcemap: false,
		write: false,
		outdir: 'out',
	};

	const result = await build(options);

	return result.outputFiles?.[0]?.text;
}
