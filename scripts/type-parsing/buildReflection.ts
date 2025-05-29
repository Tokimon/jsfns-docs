import type { Type_Reflection } from "../types";
import { buildFunctionType } from "./buildFunctionType";
import { buildObject } from "./buildObject";
import type { TypeStringOptions } from "./typeString";

export function buildReflection(
  type: Type_Reflection,
  options: TypeStringOptions,
) {
  const { children, signatures } = type.declaration;

  if (children) return buildObject(children, options);

  if (signatures)
    return signatures.map((sig) => buildFunctionType(sig, options)).join(" | ");

  return "";
}
