import { base } from '$app/paths';

export function url(...segments: string[]) {
	return [base].concat(segments).join('/') || '/';
}
