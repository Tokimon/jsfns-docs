import type { Type_Predicate } from '../types.d.ts';

export const buildPredicate = (type: Type_Predicate) =>
	`boolean (${type.name} is ${type.targetType.name})`;
