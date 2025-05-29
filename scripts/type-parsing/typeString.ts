import { logFullObject } from "~docs/utils/log";
import type { All_Types } from "../types";
import { buildArray } from "./buildArray";
import { buildConditional } from "./buildConditional";
import { buildIndexedAccess } from "./buildIndexedAccess";
import { buildIntersection } from "./buildIntersection";
import { buildIntrinsic } from "./buildIntrinsic";
import { buildLiteral } from "./buildLiteral";
import { buildNamedTupleMember } from "./buildNamedTupleMember";
import { buildPredicate } from "./buildPredicate";
import { buildReference } from "./buildReference";
import { buildReflection } from "./buildReflection";
import { buildTemplateLiteral } from "./buildTemplateLiteral";
import { buildTuple } from "./buildTuple";
import { buildTypeOperator } from "./buildTypeOperator";
import { buildUnion } from "./buildUnion";

export type TypeStringOptions = {
  nonNull?: boolean;
  commentExtractor?: string[];
  hasFailure: boolean;
};
export type TypeStringFunction = (
  type: All_Types,
  options: TypeStringOptions,
) => string | "FAILURE";

export const typeString: TypeStringFunction = (type, options) => {
  try {
    switch (type.type) {
      case "array":
        return buildArray(type, options);
      case "predicate":
        return buildPredicate(type);
      case "intrinsic":
        return buildIntrinsic(type, options);
      case "literal":
        return buildLiteral(type, options);
      case "templateLiteral":
        return buildTemplateLiteral(type, options);
      case "query": {
        return typeString(type.queryType, options);
      }
      case "tuple":
        return buildTuple(type, options);
      case "intersection":
        return buildIntersection(type, options);
      case "union":
        return buildUnion(type, options);
      case "namedTupleMember":
        return buildNamedTupleMember(type, options);
      case "reflection":
        return buildReflection(type, options);
      case "reference":
        return buildReference(type, options);
      case "conditional":
        return buildConditional(type, options);
      case "typeOperator":
        return buildTypeOperator(type, options);
      case "indexedAccess": {
        return buildIndexedAccess(type, options);
      }
    }
  } catch (err) {
    options.hasFailure = true;
    console.log("UNKNOWN TYPE:", type.type);
    logFullObject(type);
    return "FAILURE";
  }
};
