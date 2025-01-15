import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarchartComponent } from './barchart.component';

describe('BarchartComponent', () => {
  let component: BarchartComponent;
  let fixture: ComponentFixture<BarchartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [BarchartComponent]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
