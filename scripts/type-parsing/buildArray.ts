import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildArray = (type: JSONOutput.ArrayType, options: TypeStringOptions) => {
	let str = typeString(type.elementType, options);
	if (str.includes('|') || str.includes('&')) str = `(${str})`;
	return str + '[]';
};
