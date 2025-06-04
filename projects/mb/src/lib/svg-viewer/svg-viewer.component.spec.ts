import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { SvgViewerComponent } from './svg-viewer.component';

// ng test mb  --code-coverage --include='**/svg-viewer/*.spec.ts'

describe('SvgViewerComponent', () => {
  let component: SvgViewerComponent;
  let fixture: ComponentFixture<SvgViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SvgViewerComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgViewerComponent);
    fixture.componentRef.setInput('src', 'foo.svg');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
