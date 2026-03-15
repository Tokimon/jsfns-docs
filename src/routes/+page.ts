export function load() {
	const packages = Object.entries(__VERSIONS__).map(([name, vers]) => ({
		name,
		version: vers[0],
	}));

	return { packages };
}
