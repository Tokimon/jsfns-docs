import type { Kind_Module } from '~scripts/types.d.ts';
import { buildModuleMethod, type ModuleMethodSignature } from './buildModuleMethod.js';
import { findCustomTypes } from './findCustomTypes.js';
import { getModuleMethodSignatures } from './getModuleMethodSignatures.js';
import type { TypeStringOptions } from './typeString.js';

export type ModuleEntry = {
	name: string;
	functions: ModuleMethodSignature[];
};

export async function prepareModules(modules: Kind_Module[], options: TypeStringOptions) {
	const entries: ModuleEntry[] = [];

	for (const module of modules) {
		findCustomTypes(module, options);

		if (module.name === 'types') continue;

		const signatures = getModuleMethodSignatures(module);
		const methodBuilds: Promise<ModuleMethodSignature>[] = [];

		for (const signature of signatures) methodBuilds.push(buildModuleMethod(signature, options));

		entries.push({
			name: module.name,
			functions: await Promise.all(methodBuilds),
		});
	}

	return entries.sort((a, b) => {
		const A = a.name.toLowerCase();
		const B = b.name.toLowerCase();
		return A > B ? 1 : A === B ? 0 : -1;
	});
}
