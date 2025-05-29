import type { Kind_Signature } from "../types";
import { buildParam } from "./buildProperty";
import { buildSummary } from "./buildSummary";
import { TSCodeMarkdown } from "./markdown";
import { typeString, type TypeStringOptions } from "./typeString";

export const buildSignature = async (
  name: string,
  signature: Kind_Signature,
  options: TypeStringOptions,
) => {
  const { type, parameters, typeParameter } = signature;
  const params = (
    parameters?.map((param) => buildParam(param, options)) ?? []
  ).join(", ");

  let typeDef = typeParameter
    ?.map((t) => {
      if (!t.type) return t.name;

      const str = typeString(t.type, options);

      return `${t.name}extends ${str}`;
    })
    .join(", ");

  if (typeDef) typeDef = `<${typeDef}>`;

  const paramComments = (parameters || []).reduce<Record<string, string>>(
    (rec, { name, comment }) => {
      const desc = buildSummary(comment?.summary);
      if (desc) rec[name] = desc;
      return rec;
    },
    {},
  );

  const str = typeString(type, options);

  let md = await TSCodeMarkdown(`${name}${typeDef || ""}(${params}): ${str}`);

  md = md.replaceAll(
    /(class="hljs-attr")([^>]*>)([^<]*)(<)/g,
    (all, _class, restOfTag, name, endTag) => {
      let desc = paramComments[name as string] ?? "";
      if (desc) desc = ` title="${desc}"`;

      return _class + desc + restOfTag + name + endTag;
    },
  );

  return md;
};
