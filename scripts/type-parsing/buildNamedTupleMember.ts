import type { Element_NamedTupleMember } from '../types.d.ts';
import { buildPropertyLike } from './buildProperty.js';
import type { TypeStringOptions } from './typeString.js';

export function buildNamedTupleMember(prop: Element_NamedTupleMember, options: TypeStringOptions) {
	const { name, isOptional, element, defaultValue } = prop;

	return buildPropertyLike(
		{
			name,
			flags: { isOptional },
			type: element,
			defaultValue,
		},
		options,
	);
}
