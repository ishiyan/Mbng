import { Injectable } from '@angular/core';

/**
 * Manages stylesheets which are loaded into named slots so that they can be removed or changed later.
 */
@Injectable()
export class ThemeManagerService {

  /** Set the stylesheet with the specified key. */
  setTheme(key: string, href: string) {
    getLinkElementForKey(key).setAttribute('href', href);
  }

  /** Remove the stylesheet with the specified key. */
  removeTheme(key: string) {
    const existingLinkElement = getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }
}

function getLinkElementForKey(key: string) {
  return getExistingLinkElementByKey(key) || createLinkElementWithKey(key);
}

function getExistingLinkElementByKey(key: string) {
  return document.head.querySelector(`link[rel="stylesheet"].${getClassNameForKey(key)}`);
}

function createLinkElementWithKey(key: string) {
  const linkEl = document.createElement('link');
  linkEl.setAttribute('rel', 'stylesheet');
  linkEl.classList.add(getClassNameForKey(key));
  document.head.appendChild(linkEl);
  return linkEl;
}

function getClassNameForKey(key: string) {
  return `theme-manager-${key}`;
}
