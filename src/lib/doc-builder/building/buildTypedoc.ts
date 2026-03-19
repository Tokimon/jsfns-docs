import { realpath, unlink, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { Application, type JSONOutput, type NormalizedPath, TSConfigReader } from 'typedoc';

const cwd = process.cwd();
let tsconfigCounter = 0;

export async function buildTypedoc(packagePath: string): Promise<JSONOutput.ProjectReflection> {
	const tempTsconfig = join(cwd, `.tsconfig.jsdoc.${tsconfigCounter++}.json`);
	const realPackagePath = await realpath(packagePath);
	const relPath = relative(cwd, realPackagePath);
	await writeFile(
		tempTsconfig,
		JSON.stringify({
			compilerOptions: { skipLibCheck: true },
			include: [relPath + '/**/*.d.ts'],
		}),
	);

	try {
		const app = await Application.bootstrap(
			{
				entryPointStrategy: 'expand',
				readme: 'none',
				tsconfig: tempTsconfig,
				exclude: ['**/index.d.ts'],
				entryPoints: [packagePath],
				treatWarningsAsErrors: false,
			},
			[new TSConfigReader()],
		);

		const project = await app.convert();

		if (!project) throw app.logger.errorCount;

		return app.serializer.projectToObject(project, packagePath as NormalizedPath);
	} finally {
		await unlink(tempTsconfig).catch(() => {});
	}
}
