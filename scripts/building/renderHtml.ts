import { resolve } from 'node:path';
import ejs from 'ejs';
import { writeIndex } from './writeIndex.js';

type RenderIndexProps = {
	path: string;
	template: string;
	data: ejs.Data;
};

export const renderIndex = async ({ path, template, data }: RenderIndexProps) => {
	const html = await ejs.renderFile(resolve('templates', template + '.ejs'), data, { async: true });
	await writeIndex(path, html);
};
