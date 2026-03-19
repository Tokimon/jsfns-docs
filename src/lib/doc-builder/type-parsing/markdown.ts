import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight, type SynchronousOptions } from 'marked-highlight';
import { isCustomType } from './findCustomTypes.js';

const ho: SynchronousOptions = {
	langPrefix: 'hljs language-',
	highlight(code, lang) {
		const language = hljs.getLanguage(lang) ? lang : 'plaintext';

		let html = hljs.highlight(code, { language }).value;
		if (html.includes('?:')) {
			html = html.replaceAll(
				/(?<!>)\b(\w+)(?!<\/[^>]+>)\?:/g,
				(_, name) => `<span class="hljs-attr">${name}</span>?:`,
			);
		}

		if (/^\w+&lt;/.test(html)) {
			html = html.replace(
				/^(\w+)&lt;/,
				(_, name) => `<span class="hljs-title function_">${name}</span>&lt;`,
			);
		}

		html = html.replaceAll(/<span class="hljs-title class_">(\w+)<\/span>/g, (match, name) =>
			isCustomType(name)
				? `<span class="hljs-title class_" data-custom-type="${name}">${name}</span>`
				: match,
		);

		return html;
	},
};

marked.use(markedHighlight(ho));

const opts = { mangle: false, headerIds: false, gfm: true, breaks: true };

export const markdown = async (md: string) => md && marked(md, opts);

export const TSCodeMarkdown = async (code: string) => code && markdown(`\`\`\`ts\n${code}\n\`\`\``);
