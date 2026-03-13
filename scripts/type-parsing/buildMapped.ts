import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildMapped(type: JSONOutput.MappedType, options: TypeStringOptions) {
	const param = `[${type.parameter} in ${typeString(type.parameterType, options)}]`;
	const template = typeString(type.templateType, options);
	const optional = type.optionalModifier === '+' ? '?' : '';
	return `{ ${param}${optional}: ${template} }`;
}
