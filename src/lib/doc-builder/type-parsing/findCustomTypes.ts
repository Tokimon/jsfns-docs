import type { JSONOutput } from 'typedoc';
import { ReflectionKind } from 'typedoc/models';
import { buildTypeAlias } from './buildTypeAlias.js';
import { TSCodeMarkdown } from './markdown.js';
import type { TypeStringOptions } from './typeString.js';

const store = new Map<string, { type: string; moduleName: string }>();

function addCustomType(type: JSONOutput.DeclarationReflection, moduleName: string, options: TypeStringOptions) {
	if (!store.has(type.name))
		store.set(type.name, { type: buildTypeAlias(type, options), moduleName });
}

export function getCustomTypesForModule(moduleName: string) {
	const moduleTypes: string[] = [];

	for (const entry of store.values()) {
		if (entry.moduleName === moduleName) moduleTypes.push(entry.type);
	}

	return moduleTypes.join('\n\n');
}

export const getCustomTypes = () => {
	const customTypes = Array.from(store.entries()).map(async ([name, { type, moduleName }]) => ({
		name,
		markdown: await TSCodeMarkdown(type),
		moduleName,
	}));

	return Promise.all(customTypes);
};

export const isCustomType = (name: string) => store.has(name);

export function findCustomTypes(module: JSONOutput.DeclarationReflection, options: TypeStringOptions) {
	for (const child of module.children ?? [])
		if (child.kind === ReflectionKind.TypeAlias) addCustomType(child, module.name, options);
}
