import type { Type_Reflection } from '../types.d.ts';
import { buildFunctionType } from './buildFunctionType.js';
import { buildObject } from './buildObject.js';
import type { TypeStringOptions } from './typeString.js';

export function buildReflection(type: Type_Reflection, options: TypeStringOptions) {
	const { children, signatures } = type.declaration;

	if (children) return buildObject(children, options);

	if (signatures) return signatures.map((sig) => buildFunctionType(sig, options)).join(' | ');

	return '';
}
