import type { Type_Union } from '~scripts/types.d.ts';
import { buildTypeCollection } from './buildTypeCollection.js';
import type { TypeStringOptions } from './typeString.js';

export const buildUnion = (type: Type_Union, options: TypeStringOptions) =>
	buildTypeCollection(type.types, options).join(' | ');
