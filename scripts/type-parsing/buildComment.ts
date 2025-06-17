import type { Comment } from '../types.d.ts';
import { buildSummary } from './buildSummary.js';

export const buildComment = (comment?: Comment) =>
	comment ? buildSummary(comment.summary).split('\n') : [];
