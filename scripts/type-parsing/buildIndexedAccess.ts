import type { Type_IndexedAccess } from '../types.d.ts';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildIndexedAccess(type: Type_IndexedAccess, options: TypeStringOptions) {
	const objectStr = typeString(type.objectType, options);
	const indexStr = typeString(type.indexType, options);

	return `${objectStr}[${indexStr}]`;
}
