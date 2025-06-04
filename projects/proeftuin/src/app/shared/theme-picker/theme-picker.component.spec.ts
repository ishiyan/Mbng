import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ThemePickerComponent } from './theme-picker.component';

// ng test mb  --code-coverage --include='**/theme-picker/*.spec.ts'

describe('ThemePickerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ThemePickerComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: '', component: ThemePickerComponent }])
      ]
    }).compileComponents();
  });

  it('should install theme based on name', () => {
    const fixture = TestBed.createComponent(ThemePickerComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    const name = 'pink-bluegrey';
    spyOn(component.themeManagerService, 'setTheme');
    component.installTheme(name);
    expect(component.themeManagerService.setTheme).toHaveBeenCalled();
    expect(component.themeManagerService.setTheme).toHaveBeenCalledWith('theme', `assets/themes/${name}.css`);
  });
});
