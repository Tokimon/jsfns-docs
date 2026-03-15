import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

function semverCompare(a: string, b: string) {
	const pa = a.split('.');
	const pb = b.split('.');
	for (let i = 0; i < pa.length; i++) {
		if (pa[i] === 'x') break;
		const diff = Number(pb[i]) - Number(pa[i]);
		if (diff !== 0) return diff;
	}
	return 0;
}

const dataPath = resolve('./src/lib/data');

export function getVersions() {
	const versions: Record<string, string[]> = {};

	for (const entry of readdirSync(dataPath, { withFileTypes: true })) {
		if (!entry.isDirectory()) continue;
		versions[entry.name] = readdirSync(`${dataPath}/${entry.name}`)
			.map((f) => f.slice(0, -5))
			.sort(semverCompare);
	}

	return versions;
}
