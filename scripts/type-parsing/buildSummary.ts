import type { Summary } from '../types.d.ts';

export const buildSummary = (summary: Summary[] = []) =>
	summary
		.map(({ text, ...sum }) => {
			if (sum.kind !== 'inline-tag') return text;
			if (sum.tag !== '@link') return text;

			return `[${text}](#${text})`;
		})
		.join('')
		.trim();
