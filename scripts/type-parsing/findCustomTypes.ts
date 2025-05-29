import { ReflectionKind } from "typedoc";
import type { Kind_Module, Kind_TypeAlias } from "~docs/types";
import { buildTypeAlias } from "./buildTypeAlias";
import { TSCodeMarkdown } from "./markdown";
import type { TypeStringOptions } from "./typeString";

const store = new Map<string, { type: string; moduleName: string }>();

function addCustomType(
  type: Kind_TypeAlias,
  moduleName: string,
  options: TypeStringOptions,
) {
  if (!store.has(type.name))
    store.set(type.name, { type: buildTypeAlias(type, options), moduleName });
}

export function getCustomTypesForModule(moduleName: string) {
  const moduleTypes: string[] = [];

  for (const entry of store.values()) {
    if (entry.moduleName === moduleName) moduleTypes.push(entry.type);
  }

  return moduleTypes.join("\n\n");
}

export const getCustomTypesArray = () =>
  Array.from(store.entries()).map(([name, { type, moduleName }]) => ({
    name,
    markdown: TSCodeMarkdown(type),
    moduleName,
  }));

export function findCustomTypes(
  module: Kind_Module,
  options: TypeStringOptions,
) {
  for (const child of module.children)
    if (child.kind === ReflectionKind.TypeAlias)
      addCustomType(child, module.name, options);
}
