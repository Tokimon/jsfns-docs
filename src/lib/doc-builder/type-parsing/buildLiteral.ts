import type { JSONOutput } from 'typedoc';
import type { TypeStringOptions } from './typeString.js';

export function buildLiteral({ value }: JSONOutput.LiteralType, options: TypeStringOptions) {
	if (value === null) return options?.nonNull ? '' : 'null';

	const float = Number.parseFloat(String(value));
	return Number.isNaN(float) ? `'${value}'` : String(value);
}
