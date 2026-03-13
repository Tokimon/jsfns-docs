import type { JSONOutput } from 'typedoc';
import { buildTypeCollection } from './buildTypeCollection.js';
import type { TypeStringOptions } from './typeString.js';

export const buildIntersection = (type: JSONOutput.IntersectionType, options: TypeStringOptions) =>
	buildTypeCollection(type.types, options).join(' & ');
