import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TexCardComponent } from './tex-card.component';

describe('TexCardComponent', () => {
  let component: TexCardComponent;
  let fixture: ComponentFixture<TexCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TexCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TexCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
