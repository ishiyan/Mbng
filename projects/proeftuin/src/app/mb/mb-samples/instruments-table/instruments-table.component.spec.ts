import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InstrumentsTableComponent } from './instruments-table.component';

describe('Sample1Component', () => {
  let component: InstrumentsTableComponent;
  let fixture: ComponentFixture<InstrumentsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
