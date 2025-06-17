import type { Type_TemplateLiteral } from '~scripts/types.d.ts';
import { type TypeStringOptions, typeString } from './typeString.js';

const parseEntry = (entry: Type_TemplateLiteral['head'], options: TypeStringOptions): string => {
	if (Array.isArray(entry)) return entry.map((ent) => parseEntry(ent, options)).join('');

	if (typeof entry === 'string') return entry;

	const str = typeString(entry, options);
	return `\${${str}}`;
};

export function buildTemplateLiteral(type: Type_TemplateLiteral, options: TypeStringOptions) {
	const headEntry = parseEntry(type.head, options);
	const tailEntry = parseEntry(type.tail, options);
	const str = `\`${headEntry}${tailEntry}\``;

	return str;
}
