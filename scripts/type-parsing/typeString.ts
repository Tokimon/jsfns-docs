import { logFullObject } from '~scripts/utils/log.js';
import type { All_Types } from '../types.d.ts';
import { buildArray } from './buildArray.js';
import { buildConditional } from './buildConditional.js';
import { buildIndexedAccess } from './buildIndexedAccess.js';
import { buildIntersection } from './buildIntersection.js';
import { buildIntrinsic } from './buildIntrinsic.js';
import { buildLiteral } from './buildLiteral.js';
import { buildNamedTupleMember } from './buildNamedTupleMember.js';
import { buildPredicate } from './buildPredicate.js';
import { buildReference } from './buildReference.js';
import { buildReflection } from './buildReflection.js';
import { buildTemplateLiteral } from './buildTemplateLiteral.js';
import { buildTuple } from './buildTuple.js';
import { buildTypeOperator } from './buildTypeOperator.js';
import { buildUnion } from './buildUnion.js';

export type TypeStringOptions = {
	nonNull?: boolean;
	commentExtractor?: string[];
	hasFailure: boolean;
};
export type TypeStringFunction = (
	type: All_Types,
	options: TypeStringOptions,
) => string | 'FAILURE';

export const typeString: TypeStringFunction = (type, options) => {
	try {
		switch (type.type) {
			case 'array':
				return buildArray(type, options);
			case 'predicate':
				return buildPredicate(type);
			case 'intrinsic':
				return buildIntrinsic(type, options);
			case 'literal':
				return buildLiteral(type, options);
			case 'templateLiteral':
				return buildTemplateLiteral(type, options);
			case 'query': {
				return typeString(type.queryType, options);
			}
			case 'tuple':
				return buildTuple(type, options);
			case 'intersection':
				return buildIntersection(type, options);
			case 'union':
				return buildUnion(type, options);
			case 'namedTupleMember':
				return buildNamedTupleMember(type, options);
			case 'reflection':
				return buildReflection(type, options);
			case 'reference':
				return buildReference(type, options);
			case 'conditional':
				return buildConditional(type, options);
			case 'typeOperator':
				return buildTypeOperator(type, options);
			case 'indexedAccess': {
				return buildIndexedAccess(type, options);
			}
		}
	} catch {
		options.hasFailure = true;
		console.log('UNKNOWN TYPE:', type.type);
		logFullObject(type);
		return 'FAILURE';
	}
};
