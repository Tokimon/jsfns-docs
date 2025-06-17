import type { Type_Tuple } from '~scripts/types.d.ts';
import { buildTypeCollection } from './buildTypeCollection.js';
import type { TypeStringOptions } from './typeString.js';

export const buildTuple = (type: Type_Tuple, options: TypeStringOptions) =>
	`[${buildTypeCollection(type.elements, options).join(', ')}]`;
