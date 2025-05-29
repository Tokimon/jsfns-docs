import type { All_Types, Flags, Kind_Param, Kind_Property } from "../types";
import { buildComment } from "./buildComment";
import { typeString, type TypeStringOptions } from "./typeString";

type PropertyLikeProp = {
  name: string;
  flags: Flags;
  type: All_Types;
  defaultValue?: string;
};

export function buildPropertyLike(
  prop: PropertyLikeProp,
  options: TypeStringOptions,
) {
  const { name, flags, type, defaultValue } = prop;
  const optional = flags.isOptional ? "?" : "";
  const defVal = defaultValue ? " = " + defaultValue : "";

  let str = typeString(type, options);

  str = `${str}${defVal}`;

  return name === "__namedParameters" ? str : `${name}${optional}: ${str}`;
}

export function buildProperty(prop: Kind_Property, options: TypeStringOptions) {
  const opts: Required<
    Pick<TypeStringOptions, "commentExtractor" | "hasFailure">
  > = {
    commentExtractor: [],
    hasFailure: false,
  };
  if (prop.comment) opts.commentExtractor.push(...buildComment(prop.comment));

  let property = buildPropertyLike(prop, opts);
  if (options && opts.hasFailure) options.hasFailure = true;

  if (opts.commentExtractor.length)
    property = "// " + opts.commentExtractor.join("\n// ") + "\n" + property;

  return property;
}

export function buildParam(prop: Kind_Param, options: TypeStringOptions) {
  if (options?.commentExtractor && prop.comment)
    options.commentExtractor.push(...buildComment(prop.comment));

  return buildPropertyLike(prop, options);
}
