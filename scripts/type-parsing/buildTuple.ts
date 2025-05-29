import type { Type_Tuple } from "~docs/types";
import { buildTypeCollection } from "./buildTypeCollection";
import { typeString, type TypeStringOptions } from "./typeString";

export const buildTuple = (type: Type_Tuple, options: TypeStringOptions) =>
  `[${buildTypeCollection(type.elements, options).join(", ")}]`;
