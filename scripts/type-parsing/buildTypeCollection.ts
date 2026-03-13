import type { JSONOutput } from 'typedoc';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildTypeCollection = (types: JSONOutput.SomeType[] | undefined, options: TypeStringOptions) => {
	const vals: string[] = [];

	for (const type of types ?? []) {
		const str = typeString(type, options);
		if (str) vals.push(str);
	}

	return vals;
};
