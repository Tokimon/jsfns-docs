import type { JSONOutput } from 'typedoc';
import { buildObject } from './buildObject.js';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildTypeAlias(type: JSONOutput.DeclarationReflection, options: TypeStringOptions) {
	let str = 'TYPE ALIAS MISSING';

	if (type.type) str = typeString(type.type, options);
	else if (type.children) str = buildObject(type.children, options);

	return `type ${type.name} = ${str};`;
}
