import { dirname } from 'node:path';
import TypeDoc from 'typedoc';

export async function buildTypedoc(packagePath: string) {
  const app = await TypeDoc.Application.bootstrap({
    entryPointStrategy: 'expand',
    readme: 'none',
    tsconfig: './tsconfig.jsdoc.json',
    exclude: ['**/index.d.ts'],
    entryPoints: [packagePath],
  }, [new TypeDoc.TSConfigReader()]);

  const project = await app.convert();

  if (!project) throw app.logger.errorCount;

  return app.serializer.projectToObject(project, packagePath);
}
