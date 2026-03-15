import type { JSONOutput } from 'typedoc';
import { buildSummary } from './buildSummary.js';

export const buildComment = (comment?: JSONOutput.Comment) =>
	comment ? buildSummary(comment.summary).split('\n') : [];
