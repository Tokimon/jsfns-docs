import type { Type_TypeOperator } from "../types";
import { typeString, type TypeStringOptions } from "./typeString";

export function buildTypeOperator(
  type: Type_TypeOperator,
  options: TypeStringOptions,
) {
  if (!type.target) return type.operator;

  const targetStr = typeString(type.target, options);

  return `${type.operator} ${targetStr}`;
}
