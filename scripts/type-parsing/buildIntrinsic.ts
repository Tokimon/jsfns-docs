import type { JSONOutput } from 'typedoc';
import type { TypeStringOptions } from './typeString.js';

export function buildIntrinsic({ name }: JSONOutput.IntrinsicType, options: TypeStringOptions) {
	return options?.nonNull && name === 'undefined' ? '' : name;
}
