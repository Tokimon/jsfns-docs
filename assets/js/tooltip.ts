import { addClass } from '@jsfns/web-latest/addClass';
import { attr } from '@jsfns/web-latest/attr';
import { css } from '@jsfns/web-latest/css';
import { findById } from '@jsfns/web-latest/findById';
import { findByQuery } from '@jsfns/web-latest/findByQuery';
import { hasClass } from '@jsfns/web-latest/hasClass';
import { innerSize } from '@jsfns/web-latest/innerSize';
import { on } from '@jsfns/web-latest/on';
import { outerSize } from '@jsfns/web-latest/outerSize';
import { position } from '@jsfns/web-latest/position';
import { removeClass } from '@jsfns/web-latest/removeClass';
import viewport from '@jsfns/web-latest/viewport';

function positionTooltip(elm: HTMLElement, tooltip: HTMLElement) {
	const vp = viewport();
	if (!vp) return;

	const vpSize = innerSize(vp);
	const { top, bottom, left } = position(elm);
	const elmWidth = outerSize(elm).width;
	const tooltipSize = outerSize(tooltip);

	const maxWidth = vpSize.width - 30;
	const width = Math.min(tooltipSize.width, maxWidth);

	let tooltipTop = bottom + 10;

	if (bottom + tooltipSize.height - vp.scrollTop > vpSize.height) {
		tooltipTop = top - tooltipSize.height - 10;
	}

	let tooltipLeft = Math.max(15, Math.round(left + elmWidth / 2 - width / 2));

	const tooltipMaxRight = tooltipLeft + tooltipSize.width + 15;
	if (tooltipMaxRight > vpSize.width) tooltipLeft -= tooltipMaxRight - vpSize.width;

	css(tooltip, { left: tooltipLeft, top: tooltipTop, maxWidth });
}

export function initTooltips() {
	findByQuery('.module .hljs-title.class_').forEach((element) => {
		if (!element) return;
		if (hasClass(element.previousElementSibling, 'hljs-keyword')) return;

		const type = element.innerHTML.trim();

		if (!findById('Tooltip-' + type)) return;

		attr(element, 'data-custom-type', type);
	});

	on(
		'mouseenter',
		(e) => {
			const elm = e.currentTarget as HTMLElement;
			if (!elm) return;

			const tooltip = findById('Tooltip-' + elm.dataset.customType?.trim());

			if (tooltip) {
				addClass(tooltip, 'show');
				positionTooltip(elm, tooltip);
			}
		},
		{ delegate: '[data-custom-type]', capture: true },
	);

	on(
		'mouseleave',
		(e) => {
			const elm = e.currentTarget as HTMLElement;
			if (!elm) return;

			const tooltip = findById('Tooltip-' + elm.dataset.customType?.trim());

			if (tooltip) removeClass(tooltip, 'show');
		},
		{ delegate: '[data-custom-type]', capture: true },
	);

	on(
		'click',
		(e) => {
			const elm = e.currentTarget as HTMLElement;
			const types = elm?.closest('.signature')?.getElementsByClassName('types')[0];
			if (types) (types as HTMLDetailsElement).open = true;
		},
		{ delegate: '[data-custom-type]', capture: true },
	);

	on(
		'click',
		(e) => {
			const elm = e.currentTarget as HTMLElement;
			const examples = elm?.closest('.signature')?.getElementsByClassName('examples')[0];
			if (examples) (examples as HTMLDetailsElement).open = true;
		},
		{ delegate: '.hljs-title.function_', capture: true },
	);
}
