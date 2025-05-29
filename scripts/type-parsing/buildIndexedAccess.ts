import type { Type_IndexedAccess } from "../types";
import { typeString, type TypeStringOptions } from "./typeString";

export function buildIndexedAccess(
  type: Type_IndexedAccess,
  options: TypeStringOptions,
) {
  const objectStr = typeString(type.objectType, options);
  const indexStr = typeString(type.indexType, options);

  return `${objectStr}[${indexStr}]`;
}
