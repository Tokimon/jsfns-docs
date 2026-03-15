import type { PageLoadEvent } from './$types.js';

export async function load({ params }: PageLoadEvent) {
	const { default: data } = await import(`$lib/data/${params.package}/${params.version}.json`);

	return {
		packageName: params.package,
		version: params.version,
		modules: data.modules,
		customTypes: data.customTypes,
		allVersions: __VERSIONS__[params.package] ?? [],
	};
}
