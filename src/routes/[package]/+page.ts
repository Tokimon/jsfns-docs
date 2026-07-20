import { resolve } from '$app/paths';
import type { PageLoadEvent } from './$types.js';

export function load({ params }: PageLoadEvent) {
	const packageVersions = __VERSIONS__[params.package];
	const target = packageVersions?.length
		? resolve('/[package]/[version]', { package: params.package, version: packageVersions[0] })
		: resolve('/');

	return { target };
}
