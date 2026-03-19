import type { JSONOutput } from 'typedoc';
import { buildProperty } from './buildProperty.js';
import type { TypeStringOptions } from './typeString.js';

export function buildObject(
	properties: JSONOutput.DeclarationReflection[],
	options: TypeStringOptions,
) {
	const props = properties.flatMap((prop) => buildProperty(prop, options).split('\n'));
	return props.length ? `{\n  ${props.join('\n  ')}\n}` : '{}';
}
