import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildIndexedAccess(type: JSONOutput.IndexedAccessType, options: TypeStringOptions) {
	const objectStr = typeString(type.objectType, options);
	const indexStr = typeString(type.indexType, options);

	return `${objectStr}[${indexStr}]`;
}
