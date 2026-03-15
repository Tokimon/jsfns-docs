import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { buildTypedoc } from './building/buildTypedoc.js';
import { getCustomTypes } from './type-parsing/findCustomTypes.js';
import { prepareModules } from './type-parsing/prepareModules.js';
import type { TypeStringOptions } from './type-parsing/typeString.js';
import * as color from './utils/color.js';

const lineFromText = (text: string, subtraction = 0) =>
	Array(text.length - subtraction)
		.fill('-')
		.join('');

function logBox(text: string, colors = 0) {
	const txt = `  ${text}  `;
	const line = color.yellow(lineFromText(txt, colors * 9));
	console.log(`\n${line}\n${txt}\n${line}\n`);
}

const logSuccess = (text: string) => console.log(`${color.green('\u2713')} ${text}`);

const dataPath = resolve('./src/lib/data');

async function build(packageName: string) {
	const packagePath = dirname(fileURLToPath(import.meta.resolve('@jsfns/' + packageName)));

	const { version } = JSON.parse(await readFile(join(packagePath, 'package.json'), 'utf-8')) as {
		name: string;
		version: string;
	};

	logBox(
		`Building ${color.yellow('Docs')} for package: ${color.blue(packageName)} ${color.gray('@' + version)}`,
		3,
	);

	const docs = await buildTypedoc(packagePath);

	const options: TypeStringOptions = { hasFailure: false };
	const modules = await prepareModules(docs.children ?? [], options);
	if (options.hasFailure) throw new Error('Some types failed to parse correctly');

	const majorVersion = version.replace(/\d+$/, 'x');

	logSuccess('types parsed');

	const customTypes = await getCustomTypes();

	const packageDataPath = join(dataPath, packageName);
	await mkdir(packageDataPath, { recursive: true });

	await writeFile(
		join(packageDataPath, majorVersion + '.json'),
		JSON.stringify({ modules, customTypes }, null, 2),
	);

	logSuccess(`${color.blue(packageName + '/' + majorVersion)}.json written`);

	logBox(`${color.blue(packageName)} ${color.yellow('data')} generation complete`, 2);
}

async function run() {
	await build('core');
	await build('web');
}

run().catch(console.error);
