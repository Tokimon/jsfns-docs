import type { Kind_Property } from '../types.d.ts';
import { buildProperty } from './buildProperty.js';
import type { TypeStringOptions } from './typeString.js';

export function buildObject(properties: Kind_Property[], options: TypeStringOptions) {
	const props = properties.flatMap((prop) => buildProperty(prop, options).split('\n'));
	return props.length ? `{\n  ${props.join('\n  ')}\n}` : '{}';
}
