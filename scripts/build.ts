/* eslint-disable no-console */
import { mkdir } from 'node:fs/promises';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { dirname, join } from 'path';
import { buildCSS } from './building/buildCSS';
import { buildJS } from './building/buildJS';
import { buildTypedoc } from './building/buildTypedoc';
import { getPackageVersions } from './building/getPackageVersions';
import { renderIndex } from './building/renderHtml';
import { getCustomTypesArray } from './type-parsing/findCustomTypes';
import { prepareModules } from './type-parsing/prepareModules';
import { type Kind_Project } from './types';
import * as color from './utils/color';

const lineFromText = (text: string, subtraction = 0) =>
  Array(text.length - subtraction)
    .fill('-')
    .join('');

function boxLog(text: string, colors = 0) {
  text = `  ${text}  `;
  const line = color.yellow(lineFromText(text, colors * 9));
  console.log(`\n${line}\n${text}\n${line}\n`);
}

const checkLog = (text: string) => console.log(`${color.green('🗸')} ${text}`);

async function build(packageName: string) {
  const packagePath = dirname(require.resolve('@jsfns/' + packageName));
  const docsPath = resolve('./docs');

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { version } = require(join(packagePath, 'package.json')) as { name: string; version: string };

  boxLog(`Building ${color.yellow('Docs')} for package: ${color.blue(packageName)} ${color.gray('@' + version)}`, 3);

  const docs = (await buildTypedoc(packagePath)) as unknown as Kind_Project;

  // NOTE Re-introduce to debug docs JSON
  // await writeFile(join(docsPath, packageName + '.json'), JSON.stringify(docs, null, 2));

  const modules = prepareModules(docs.children);
  const majorVersion = version.replace(/\d+$/, 'x');
  const versionPath = join(docsPath, packageName, majorVersion);

  checkLog('types parsed');

  const allVersions = await getPackageVersions(docsPath);
  await writeFile(join(docsPath, 'versions.json'), JSON.stringify(allVersions));

  checkLog('Versions build');

  const js = await buildJS();

  checkLog('JS build');

  const [landingCSS, packageCSS, versionCSS] = await Promise.all([buildCSS('landing'), buildCSS('package'), buildCSS('version')]);

  checkLog('CSS build');

  await mkdir(versionPath, { recursive: true });

  await renderIndex({
    template: 'version',
    path: versionPath,
    data: {
      modules,
      packageName,
      displayVersion: version,
      currentVersion: majorVersion,
      customTypes: getCustomTypesArray(),
      css: versionCSS,
      js,
    },
  });

  checkLog(`${color.blue(packageName + '/' + majorVersion + '/')}${color.yellow('index.html')} successfully generated`);

  const indexes = [
    {
      template: 'package',
      path: join(docsPath, packageName),
      data: {
        packageName,
        version: allVersions[packageName][0],
        css: packageCSS,
      },
    },
    {
      template: 'landing',
      path: docsPath,
      data: {
        packages: Object.entries(allVersions).map(([name, [version]]) => ({ name, version })),
        css: landingCSS,
      },
    },
  ];

  await Promise.all(indexes.map(renderIndex));

  checkLog(`${color.blue(packageName + '/')} and ${color.blue('./')} ${color.yellow('index.html')} successfully generated`);

  boxLog(`${color.blue(packageName)} ${color.yellow('Docs')} generation complete`, 2);
}

build('core')
  .then(() => build('web'))
  .catch(console.error);
