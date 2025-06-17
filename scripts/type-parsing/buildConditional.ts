import type { Type_Conditional } from '../types.d.ts';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildConditional(type: Type_Conditional, options: TypeStringOptions) {
	const checkStr = typeString(type.checkType, options);
	const extendsStr = typeString(type.extendsType, options);
	const trueStr = typeString(type.trueType, options);
	const falseStr = typeString(type.falseType, options);

	return `${checkStr} extends ${extendsStr} ? ${trueStr}: ${falseStr}`;
}
