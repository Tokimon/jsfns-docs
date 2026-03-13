import type { JSONOutput } from 'typedoc';
import { buildTypeCollection } from './buildTypeCollection.js';
import type { TypeStringOptions } from './typeString.js';

export const buildUnion = (type: JSONOutput.UnionType, options: TypeStringOptions) =>
	buildTypeCollection(type.types, options).join(' | ');
