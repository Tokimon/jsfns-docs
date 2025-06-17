export const loadVersions = () =>
	fetch('../../versions.json').then((resp): Promise<Record<string, string[]>> => resp.json());
