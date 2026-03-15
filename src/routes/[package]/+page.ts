import { redirect } from '@sveltejs/kit';
import type { PageLoadEvent } from './$types.js';

export function load({ params }: PageLoadEvent) {
	const packageVersions = __VERSIONS__[params.package];
	const url = packageVersions?.length ? `/${params.package}/${packageVersions[0]}` : '/';

	redirect(307, url);
}
