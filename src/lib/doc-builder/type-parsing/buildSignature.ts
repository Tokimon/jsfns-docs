import type { JSONOutput } from 'typedoc';
import { buildParamData, type ParamData } from './buildProperty.js';
import { TSCodeMarkdown } from './markdown.js';
import { type TypeStringOptions, typeString } from './typeString.js';

export type SignatureData = {
	definition: string; // markdown html
	params: ParamData[];
	returnType: string;
	typeParameters?: string;
};

function formatParam({ name, type, optional, defaultValue }: ParamData) {
	const defVal = defaultValue ? ` = ${defaultValue}` : '';

	return name === '__namedParameters'
		? `${type}${defVal}`
		: `${name}${optional ? '?' : ''}: ${type}${defVal}`;
}

export const buildSignature = async (
	name: string,
	signature: JSONOutput.SignatureReflection,
	options: TypeStringOptions,
): Promise<SignatureData> => {
	const { type, parameters, typeParameters } = signature;
	const paramsData = parameters?.map((param) => buildParamData(param, options)) ?? [];
	const params = paramsData.map(formatParam).join(', ');

	let typeDef = typeParameters
		?.map((t) => {
			if (!t.type) return t.name;

			const str = typeString(t.type, options);

			return `${t.name} extends ${str}`;
		})
		.join(', ');

	if (typeDef) typeDef = `<${typeDef}>`;

	const returnType = type ? typeString(type, options) : 'void';

	let md = await TSCodeMarkdown(`${name}${typeDef || ''}(${params}): ${returnType}`);

	md = md.replaceAll(
		/(class="hljs-attr")([^>]*>)([^<]*)(<)/g,
		(_, _class, restOfTag, paramName, endTag) => {
			const desc = paramsData.find((p) => p.name === paramName)?.description ?? '';
			const title = desc ? ` title="${desc}"` : '';

			return _class + title + restOfTag + paramName + endTag;
		},
	);

	return { definition: md, params: paramsData, returnType, typeParameters: typeDef };
};
