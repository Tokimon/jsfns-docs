import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildTemplateLiteral(type: JSONOutput.TemplateLiteralType, options: TypeStringOptions) {
	const headEntry = type.head;
	const tailEntry = type.tail
		.map(([tailType, text]) => `\${${typeString(tailType, options)}}${text}`)
		.join('');
	const str = `\`${headEntry}${tailEntry}\``;

	return str;
}
