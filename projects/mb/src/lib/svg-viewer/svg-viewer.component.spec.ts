import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SvgViewerComponent } from './svg-viewer.component';

describe('SvgViewerComponent', () => {
  let component: SvgViewerComponent;
  let fixture: ComponentFixture<SvgViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [SvgViewerComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
