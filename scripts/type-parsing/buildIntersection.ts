import type { Type_Intersection } from "~docs/types";
import { buildTypeCollection } from "./buildTypeCollection";
import type { TypeStringOptions } from "./typeString";

export const buildIntersection = (
  type: Type_Intersection,
  options: TypeStringOptions,
) => buildTypeCollection(type.types, options).join(" & ");
