import type { JSONOutput } from 'typedoc';
import { buildParam } from './buildProperty.js';
import { buildSummary } from './buildSummary.js';
import { TSCodeMarkdown } from './markdown.js';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildSignature = async (
	name: string,
	signature: JSONOutput.SignatureReflection,
	options: TypeStringOptions,
) => {
	const { type, parameters, typeParameters } = signature;
	const params = (parameters?.map((param) => buildParam(param, options)) ?? []).join(', ');

	let typeDef = typeParameters
		?.map((t) => {
			if (!t.type) return t.name;

			const str = typeString(t.type, options);

			return `${t.name}extends ${str}`;
		})
		.join(', ');

	if (typeDef) typeDef = `<${typeDef}>`;

	const paramComments = (parameters || []).reduce<Record<string, string>>(
		(rec, { name, comment }) => {
			const desc = buildSummary(comment?.summary);
			if (desc) rec[name] = desc;
			return rec;
		},
		{},
	);

	const str = type ? typeString(type, options) : 'void';

	let md = await TSCodeMarkdown(`${name}${typeDef || ''}(${params}): ${str}`);

	md = md.replaceAll(
		/(class="hljs-attr")([^>]*>)([^<]*)(<)/g,
		(_, _class, restOfTag, name, endTag) => {
			let desc = paramComments[name as string] ?? '';
			if (desc) desc = ` title="${desc}"`;

			return _class + desc + restOfTag + name + endTag;
		},
	);

	return md;
};
