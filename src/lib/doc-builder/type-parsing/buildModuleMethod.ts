import type { JSONOutput } from 'typedoc';
import type { ParamData } from './buildProperty.js';
import { buildSignature } from './buildSignature.js';
import { buildSummary } from './buildSummary.js';
import { firstElement, markdown } from './markdown.js';
import type { TypeStringOptions } from './typeString.js';

export type ModuleMethodSignature = {
	name: string;
	definition: string; // markdown html
	params: ParamData[];
	returnType: string;
	typeParameters?: string;
	summary: string; // markdown html
	comment: string; // markdown html
	examples: string[]; // markdown html
	remarks: string[]; // markdown html
	descriptions: string; // markdown html
	typesMarkdown: string; // markdown html
};

export async function buildModuleMethod(
	method: JSONOutput.SignatureReflection,
	options: TypeStringOptions,
): Promise<ModuleMethodSignature> {
	const { comment } = method;

	const examples: Promise<string>[] = [];
	const remarks: Promise<string>[] = [];
	const descriptions: Promise<string>[] = [];
	let summaryTag: string | undefined;

	for (const { tag, content } of comment?.blockTags || []) {
		const tagText = buildSummary(content);

		if (tag.startsWith('@example')) {
			examples.push(markdown(tagText));
		} else if (tag.startsWith('@remark')) {
			remarks.push(markdown(tagText));
		} else if (tag.startsWith('@summary')) {
			summaryTag = tagText;
		} else {
			descriptions.push(markdown(`<span class="hljs-doctag">${tag}</span> : ${tagText}`));
		}
	}

	const builds = await Promise.all([
		buildSignature(method.name, method, options),
		markdown(buildSummary(comment?.summary)),
		Promise.all(examples),
		Promise.all(remarks),
		Promise.all(descriptions),
		// await TSCodeMarkdown(getCustomTypesForModule(func.name)),
	]);

	const signatureData = builds[0];
	const commentHtml = builds[1];
	const summary = firstElement(summaryTag ? await markdown(summaryTag) : commentHtml);

	return {
		name: method.name,
		definition: signatureData.definition,
		params: signatureData.params,
		returnType: signatureData.returnType,
		typeParameters: signatureData.typeParameters,
		summary,
		comment: commentHtml,
		examples: builds[2],
		remarks: builds[3],
		descriptions: builds[4].join('\n'),
		typesMarkdown: '', //builds[5],
	};
}
