import type { JSONOutput } from 'typedoc';
import { buildTypeCollection } from './buildTypeCollection.js';
import type { TypeStringOptions } from './typeString.js';

export const buildTuple = (type: JSONOutput.TupleType, options: TypeStringOptions) =>
	`[${buildTypeCollection(type.elements, options).join(', ')}]`;
