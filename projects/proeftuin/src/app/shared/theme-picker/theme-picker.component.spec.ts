import { TestBed, waitForAsync } from '@angular/core/testing';
import {ThemePickerComponent} from './theme-picker.component';
import {ThemePickerModule} from './theme-picker.module';

describe('ThemePickerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ThemePickerModule],
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
