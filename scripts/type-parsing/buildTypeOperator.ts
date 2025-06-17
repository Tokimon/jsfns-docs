import type { Type_TypeOperator } from '../types.d.ts';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildTypeOperator(type: Type_TypeOperator, options: TypeStringOptions) {
	if (!type.target) return type.operator;

	const targetStr = typeString(type.target, options);

	return `${type.operator} ${targetStr}`;
}
