import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ThemeManagerService } from './theme-manager.service';

describe('ThemeManagerService', () => {
  let themeManagerService: ThemeManagerService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [ThemeManagerService]
  }));

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
