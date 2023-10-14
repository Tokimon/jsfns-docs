import findById from '@jsfns/web-latest/findById';
import { findByQuery } from '@jsfns/web-latest/findByQuery';

export function initMethodLinks() {
  findByQuery('p code').forEach((elm) => {
    const name = elm.innerText;
    if (findById(name)) elm.innerHTML = `<a href="#${name}">${name}</a>`;
  });
}
