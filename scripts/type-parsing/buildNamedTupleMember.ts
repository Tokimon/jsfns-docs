import type { Element_NamedTupleMember } from "../types";
import { buildPropertyLike } from "./buildProperty";
import type { TypeStringOptions } from "./typeString";

export function buildNamedTupleMember(
  prop: Element_NamedTupleMember,
  options: TypeStringOptions,
) {
  const { name, isOptional, element, defaultValue } = prop;

  return buildPropertyLike(
    {
      name,
      flags: { isOptional },
      type: element,
      defaultValue,
    },
    options,
  );
}
