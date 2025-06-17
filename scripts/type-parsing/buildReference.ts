import type { Type_Reference } from '../types.d.ts';
import { type TypeStringOptions, typeString } from './typeString.js';

export function buildReference(type: Type_Reference, options: TypeStringOptions) {
	let { name, typeArguments } = type;
	typeArguments = typeArguments?.filter(
		(t) => (t.type === 'reference' && t.target !== -1) || t.type !== 'reference',
	);

	if (!typeArguments?.length) return name;

	if (name === 'NonNullable') {
		const opts = { nonNull: true, hasFailure: false };
		return typeString(typeArguments[0], opts);
	}

	const args = typeArguments.map((type) => typeString(type, options));

	return `${name}<${args.join(', ')}>`;
}
