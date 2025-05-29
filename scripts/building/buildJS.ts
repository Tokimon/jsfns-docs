import { type BuildOptions, build } from 'esbuild';
import path from 'node:path';

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
