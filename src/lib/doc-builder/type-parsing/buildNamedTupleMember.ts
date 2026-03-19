import type { JSONOutput } from 'typedoc';
import { buildPropertyLike } from './buildProperty.js';
import type { TypeStringOptions } from './typeString.js';

export function buildNamedTupleMember(
	prop: JSONOutput.NamedTupleMemberType,
	options: TypeStringOptions,
) {
	const { name, isOptional, element } = prop;

	return buildPropertyLike(
		{
			name,
			flags: { isOptional },
			type: element,
		},
		options,
	);
}
