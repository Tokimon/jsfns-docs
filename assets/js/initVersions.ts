import { append } from '@jsfns/web-latest/append';
import { css } from '@jsfns/web-latest/css';
import { findOneByQuery } from '@jsfns/web-latest/findByQuery';
import { loadVersions } from './load-versions';
import { toggleList } from './toggleList';

export async function initVersions() {
	const pageVersion = findOneByQuery('.page-version') as HTMLElement;

	const versions = await loadVersions();

	const { name, currentVersion } = pageVersion.dataset;
	const packageVersions = versions[name as string];

	if (packageVersions.length < 2) return;

	css(findOneByQuery(pageVersion, '.current-version') as HTMLElement, 'cursor', 'pointer');

	const items = packageVersions.map((version) => {
		const content =
			currentVersion === version
				? `<div class="version selected">v. ${version}</div>`
				: `<a href="../${version}" class="version">v. ${version}</a>`;

		return `<li>${content}</li>`;
	});

	append(pageVersion, `<ul class="version-list">${items.join('')}</ul>`);

	toggleList('.page-version .version-list', '.page-version .current-version');
}
