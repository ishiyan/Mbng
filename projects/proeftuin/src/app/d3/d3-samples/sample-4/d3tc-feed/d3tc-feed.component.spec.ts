import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { D3tcFeedComponent } from './d3tc-feed.component';

describe('D3tcFeedComponent', () => {
  let component: D3tcFeedComponent;
  let fixture: ComponentFixture<D3tcFeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ D3tcFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3tcFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
