import { redirect } from '@sveltejs/kit';
import { url } from '$lib/url.js';
import type { PageLoadEvent } from './$types.js';

export function load({ params }: PageLoadEvent) {
	const packageVersions = __VERSIONS__[params.package];
	const target = packageVersions?.length ? url(params.package, packageVersions[0]) : url();

	redirect(307, target);
}
