import type { JSONOutput } from 'typedoc';
import { buildComment } from './buildComment.js';
import { type TypeStringOptions, typeString } from './typeString.js';

type PropertyLikeProp = {
	name: string;
	flags: JSONOutput.ReflectionFlags;
	type?: JSONOutput.SomeType;
	defaultValue?: string;
};

export function buildPropertyLike(prop: PropertyLikeProp, options: TypeStringOptions) {
	const { name, flags, type, defaultValue } = prop;
	const optional = flags.isOptional ? '?' : '';
	const defVal = defaultValue ? ' = ' + defaultValue : '';

	let str = type ? typeString(type, options) : 'unknown';

	str = `${str}${defVal}`;

	return name === '__namedParameters' ? str : `${name}${optional}: ${str}`;
}

export function buildProperty(prop: JSONOutput.DeclarationReflection, options: TypeStringOptions) {
	const opts: Required<Pick<TypeStringOptions, 'commentExtractor' | 'hasFailure'>> = {
		commentExtractor: [],
		hasFailure: false,
	};
	if (prop.comment) opts.commentExtractor.push(...buildComment(prop.comment));

	let property = buildPropertyLike(prop, opts);
	if (options && opts.hasFailure) options.hasFailure = true;

	if (opts.commentExtractor.length)
		property = '// ' + opts.commentExtractor.join('\n// ') + '\n' + property;

	return property;
}

export function buildParam(prop: JSONOutput.ParameterReflection, options: TypeStringOptions) {
	if (options?.commentExtractor && prop.comment)
		options.commentExtractor.push(...buildComment(prop.comment));

	return buildPropertyLike(prop, options);
}
