import { Application, type NormalizedPath, TSConfigReader } from 'typedoc';

export async function buildTypedoc(packagePath: string) {
	const app = await Application.bootstrap(
		{
			entryPointStrategy: 'expand',
			readme: 'none',
			tsconfig: './tsconfig.jsdoc.json',
			exclude: ['**/index.d.ts'],
			entryPoints: [packagePath],
			treatWarningsAsErrors: true,
		},
		[new TSConfigReader()],
	);

	const project = await app.convert();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if (!project) throw app.logger.errorCount;

	return app.serializer.projectToObject(project, packagePath as NormalizedPath);
}
