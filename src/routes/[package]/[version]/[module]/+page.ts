import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { PageLoadEvent } from './$types';

export async function load({ params, parent }: PageLoadEvent) {
	const { modules } = await parent();
	const module = modules.find((m) => m.name === params.module);

	if (!module) redirect(307, resolve('/[package]/[version]', params));

	return { module };
}
