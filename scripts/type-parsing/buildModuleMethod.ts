import type { Kind_Signature } from "~docs/types";
import { buildSignature } from "./buildSignature";
import { buildSummary } from "./buildSummary";
import { markdown } from "./markdown";
import type { TypeStringOptions } from "./typeString";

export type ModuleMethodSignature = {
  definition: string; // markdown html
  comment: string; // markdown html
  examples: string[]; // markdown html
  remarks: string[]; // markdown html
  descriptions: string; // markdown html
  typesMarkdown: string; // markdown html
};

export async function buildModuleMethod(
  method: Kind_Signature,
  options: TypeStringOptions,
): Promise<ModuleMethodSignature> {
  const { comment } = method;

  const examples: Promise<string>[] = [];
  const remarks: Promise<string>[] = [];
  const descriptions: Promise<string>[] = [];

  for (const { tag, content } of comment?.blockTags || []) {
    const summaryTag = buildSummary(content);

    if (tag.startsWith("@example")) {
      examples.push(markdown(summaryTag));
    } else if (tag.startsWith("@remark")) {
      remarks.push(markdown(summaryTag));
    } else {
      descriptions.push(
        markdown(`<span class="hljs-doctag">${tag}</span> : ${summaryTag}`),
      );
    }
  }

  const builds = await Promise.all([
    buildSignature(method.name, method, options),
    markdown(buildSummary(comment?.summary)),
    Promise.all(examples),
    Promise.all(remarks),
    Promise.all(descriptions),
    // await TSCodeMarkdown(getCustomTypesForModule(func.name)),
  ]);

  return {
    definition: builds[0],
    comment: builds[1],
    examples: builds[2],
    remarks: builds[3],
    descriptions: builds[4].join("\n"),
    typesMarkdown: "", //builds[5],
  };
}
