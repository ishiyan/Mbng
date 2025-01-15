import { TestBed, waitForAsync } from '@angular/core/testing';
import {ThemePickerComponent} from './theme-picker.component';

describe('ThemePickerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ThemePickerComponent],
    }).compileComponents();
  }));

  it('should install theme based on name', () => {
    const fixture = TestBed.createComponent(ThemePickerComponent);
    const component = fixture.componentInstance;
    const name = 'pink-bluegrey';
    spyOn(component.themeManagerService, 'setTheme');
    component.installTheme(name);
    expect(component.themeManagerService.setTheme).toHaveBeenCalled();
    expect(component.themeManagerService.setTheme).toHaveBeenCalledWith('theme', `assets/${name}.css`);
  });
});
