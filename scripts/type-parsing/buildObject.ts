import type { Kind_Property } from "../types";
import { buildProperty } from "./buildProperty";
import type { TypeStringOptions } from "./typeString";

export function buildObject(
  properties: Kind_Property[],
  options: TypeStringOptions,
) {
  const props = properties.flatMap((prop) =>
    buildProperty(prop, options).split("\n"),
  );
  return props.length ? `{\n  ${props.join("\n  ")}\n}` : "{}";
}
