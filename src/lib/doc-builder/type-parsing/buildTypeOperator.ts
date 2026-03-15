import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildTypeOperator(type: JSONOutput.TypeOperatorType, options: TypeStringOptions) {
	if (!type.target) return type.operator;

	const targetStr = typeString(type.target, options);

	return `${type.operator} ${targetStr}`;
}
