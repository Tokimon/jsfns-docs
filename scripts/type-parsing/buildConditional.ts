import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildConditional(type: JSONOutput.ConditionalType, options: TypeStringOptions) {
	const checkStr = typeString(type.checkType, options);
	const extendsStr = typeString(type.extendsType, options);
	const trueStr = typeString(type.trueType, options);
	const falseStr = typeString(type.falseType, options);

	return `${checkStr} extends ${extendsStr} ? ${trueStr}: ${falseStr}`;
}
