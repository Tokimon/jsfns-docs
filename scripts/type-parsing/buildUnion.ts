import type { Type_Union } from "~docs/types";
import { buildTypeCollection } from "./buildTypeCollection";
import type { TypeStringOptions } from "./typeString";

export const buildUnion = (type: Type_Union, options: TypeStringOptions) =>
  buildTypeCollection(type.types, options).join(" | ");
