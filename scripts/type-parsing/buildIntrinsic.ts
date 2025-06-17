import type { Type_Intrinsic } from '../types.d.ts';
import type { TypeStringOptions } from './typeString.js';

export function buildIntrinsic({ name }: Type_Intrinsic, options: TypeStringOptions) {
	return options?.nonNull && name === 'undefined' ? '' : name;
}
