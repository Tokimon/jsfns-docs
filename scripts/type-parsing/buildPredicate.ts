import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildPredicate = (type: JSONOutput.PredicateType, options: TypeStringOptions) => {
	const targetStr = type.targetType ? typeString(type.targetType, options) : 'unknown';
	return `boolean (${type.name} is ${targetStr})`;
};
