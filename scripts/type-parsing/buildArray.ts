import type { Type_Array } from '../types.d.ts';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildArray = (type: Type_Array, options: TypeStringOptions) => {
	let str = typeString(type.elementType, options);
	if (str.includes('|') || str.includes('&')) str = `(${str})`;
	return str + '[]';
};
