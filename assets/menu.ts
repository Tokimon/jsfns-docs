import fuzzySearch from '@jsfns/core-latest/fuzzySearch';
import { addClass } from '@jsfns/web-latest/addClass';
import { css } from '@jsfns/web-latest/css';
import { findById } from '@jsfns/web-latest/findById';
import { findByQuery, findOneByQuery } from '@jsfns/web-latest/findByQuery';
import { on } from '@jsfns/web-latest/on';
import { removeClass } from '@jsfns/web-latest/removeClass';
import { toggleList } from './toggleList';

function onHashChange() {
  const moduleName = location.hash.slice(1);
  const current = findOneByQuery('.menu-list-item.current');

  if (moduleName) {
    const menuItem = findById('Menu-' + moduleName);
    if (menuItem === current) return;

    addClass(menuItem, 'current');
  }

  removeClass(current, 'current');
}

function initSearch() {
  const SearchField = findById<HTMLInputElement>('Menu-Search');
  if (!SearchField) return;

  const menuItems = findByQuery('#Menu .menu-list-item');

  on(SearchField, 'input', () => {
    const searchWord = SearchField.value;

    menuItems.forEach((itm) => {
      const isMatch = fuzzySearch(itm.id.slice(5), searchWord);
      css(itm, 'display', !isMatch ? 'none' : null);
    });
  });
}

function initCurrentChange() {
  toggleList('#Menu', '.menu-trigger');

  on(window, 'hashchange', onHashChange);
  onHashChange();
}

export function initMenu() {
  initCurrentChange();
  initSearch();
}
