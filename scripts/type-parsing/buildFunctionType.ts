import type { Kind_Signature } from '../types.d.ts';
import { buildComment } from './buildComment.js';
import { buildParam } from './buildProperty.js';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildFunctionType = (signature: Kind_Signature, options: TypeStringOptions) => {
	const { type, parameters, comment } = signature;
	if (options?.commentExtractor && comment) options.commentExtractor.push(...buildComment(comment));

	const params = parameters?.map((param) => buildParam(param, options)) || [];
	const str = typeString(type, options);

	return `(${params.join(', ')}) => ${str}`;
};
