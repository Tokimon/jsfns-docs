import type { CustomTypeEntry } from '$lib/doc-builder/type-parsing/findCustomTypes.js';
import type { ModuleEntry } from '$lib/doc-builder/type-parsing/prepareModules.js';
import type { LayoutLoadEvent } from './$types.js';

type DocData = { modules: ModuleEntry[]; customTypes: CustomTypeEntry[] };

export async function load({ params }: LayoutLoadEvent) {
	const { default: data } = (await import(
		`$lib/data/${params.package}/${params.version}.json`
	)) as { default: DocData };

	return {
		packageName: params.package,
		version: params.version,
		modules: data.modules,
		customTypes: data.customTypes,
		allVersions: __VERSIONS__[params.package] ?? [],
	};
}
