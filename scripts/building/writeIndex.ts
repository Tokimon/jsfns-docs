import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export const writeIndex = (path: string, html: string) => writeFile(join(path, 'index.html'), html);
