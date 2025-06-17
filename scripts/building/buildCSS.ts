import { readFile } from 'node:fs/promises';
import cssnano from 'cssnano';
import postcss from 'postcss';
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';

export async function buildCSS(section: string) {
	const from = `./assets/css/${section}.css`;
	const rawCss = await readFile(from);
	const result = await postcss([postcssNested, postcssImport(), cssnano()]).process(rawCss, {
		from,
	});

	return result.css;
}
