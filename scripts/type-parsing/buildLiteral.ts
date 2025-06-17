import type { Type_Literal } from '../types.d.ts';
import type { TypeStringOptions } from './typeString.js';

export function buildLiteral({ value }: Type_Literal, options: TypeStringOptions) {
	if (value === null) return options?.nonNull ? '' : 'null';

	const float = Number.parseFloat(value);
	return Number.isNaN(float) ? `'${value}'` : value;
}
