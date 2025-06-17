import { ReflectionKind } from 'typedoc/models';
import type { Kind_Module, Kind_TypeAlias } from '~scripts/types.d.ts';
import { buildTypeAlias } from './buildTypeAlias.js';
import { TSCodeMarkdown } from './markdown.js';
import type { TypeStringOptions } from './typeString.js';

const store = new Map<string, { type: string; moduleName: string }>();

function addCustomType(type: Kind_TypeAlias, moduleName: string, options: TypeStringOptions) {
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

export function findCustomTypes(module: Kind_Module, options: TypeStringOptions) {
	for (const child of module.children)
		if (child.kind === ReflectionKind.TypeAlias) addCustomType(child, module.name, options);
}
