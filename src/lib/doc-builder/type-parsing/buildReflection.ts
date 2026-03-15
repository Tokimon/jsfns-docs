import type { JSONOutput } from 'typedoc';
import { buildFunctionType } from './buildFunctionType.js';
import { buildObject } from './buildObject.js';
import type { TypeStringOptions } from './typeString.js';

export function buildReflection(type: JSONOutput.ReflectionType, options: TypeStringOptions) {
	const { children, signatures } = type.declaration;

	if (children) return buildObject(children, options);

	if (signatures) return signatures.map((sig) => buildFunctionType(sig, options)).join(' | ');

	return '';
}
