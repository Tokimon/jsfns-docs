import type { JSONOutput } from 'typedoc';
import { buildComment } from './buildComment.js';
import { buildParam } from './buildProperty.js';
import { type TypeStringOptions, typeString } from './typeString.js';

export const buildFunctionType = (
	signature: JSONOutput.SignatureReflection,
	options: TypeStringOptions,
) => {
	const { type, parameters, comment } = signature;
	if (options?.commentExtractor && comment) options.commentExtractor.push(...buildComment(comment));

	const params = parameters?.map((param) => buildParam(param, options)) || [];
	const str = type ? typeString(type, options) : 'void';

	return `(${params.join(', ')}) => ${str}`;
};
