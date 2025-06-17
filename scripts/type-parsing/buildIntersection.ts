import type { Type_Intersection } from '~scripts/types.d.ts';
import { buildTypeCollection } from './buildTypeCollection.js';
import type { TypeStringOptions } from './typeString.js';

export const buildIntersection = (type: Type_Intersection, options: TypeStringOptions) =>
	buildTypeCollection(type.types, options).join(' & ');
