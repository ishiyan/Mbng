import { provideZonelessChangeDetection } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ThemeManagerService } from './theme-manager.service';

// ng test mb  --code-coverage --include='**/theme-picker/*.spec.ts'

describe('ThemeManagerService', () => {
  let themeManagerService: ThemeManagerService;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
  });

  beforeEach(inject([ThemeManagerService], (tms: ThemeManagerService) => {
    themeManagerService = tms;
  }));

  afterEach(() => {
    const links = document.head.querySelectorAll('link');
    for (const link of Array.prototype.slice.call(links)) {
      if (link.className.includes('theme-manager-')) {
        document.head.removeChild(link);
      }
    }
  });

  it('should add theme to head', () => {
    themeManagerService.setTheme('test', 'test.css');
    const themeEl = document.head.querySelector('.theme-manager-test') as HTMLLinkElement;
    expect(themeEl).not.toBeNull();
    expect(themeEl.href.endsWith('test.css')).toBe(true);
  });

  it('should change existing theme', () => {
    themeManagerService.setTheme('test', 'test.css');
    const themeEl = document.head.querySelector('.theme-manager-test') as HTMLLinkElement;
    expect(themeEl).not.toBeNull();
    expect(themeEl.href.endsWith('test.css')).toBe(true);

    themeManagerService.setTheme('test', 'new.css');
    expect(themeEl.href.endsWith('new.css')).toBe(true);
  });

  it('should remove existing theme', () => {
    themeManagerService.setTheme('test', 'test.css');
    let themeEl = document.head.querySelector('.theme-manager-test') as HTMLLinkElement;
    expect(themeEl).not.toBeNull();
    expect(themeEl.href.endsWith('test.css')).toBe(true);

    themeManagerService.removeTheme('test');
    themeEl = document.head.querySelector('.theme-manager-test') as HTMLLinkElement;
    expect(themeEl).toBeNull();
  });
});
