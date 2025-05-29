import type { Kind_Signature } from "../types";
import { buildComment } from "./buildComment";
import { buildParam } from "./buildProperty";
import { typeString, type TypeStringOptions } from "./typeString";

export const buildFunctionType = (
  signature: Kind_Signature,
  options: TypeStringOptions,
) => {
  const { type, parameters, comment } = signature;
  if (options?.commentExtractor && comment)
    options.commentExtractor.push(...buildComment(comment));

  const params = parameters?.map((param) => buildParam(param, options)) || [];
  const str = typeString(type, options);

  return `(${params.join(", ")}) => ${str}`;
};
