import type { JSONOutput } from 'typedoc';

export const buildSummary = (summary: JSONOutput.CommentDisplayPart[] = []) =>
	summary
		.map(({ text, ...sum }) => {
			if (sum.kind !== 'inline-tag') return text;
			if (sum.tag !== '@link') return text;

			return `[${text}](#${text})`;
		})
		.join('')
		.trim();
