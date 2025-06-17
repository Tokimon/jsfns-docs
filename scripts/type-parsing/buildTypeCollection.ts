import type { All_Types } from '../types.d.ts';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildTypeCollection = (types: All_Types[] | undefined, options: TypeStringOptions) => {
	const vals: string[] = [];

	for (const type of types ?? []) {
		const str = typeString(type, options);
		if (str) vals.push(str);
	}

	return vals;
};
