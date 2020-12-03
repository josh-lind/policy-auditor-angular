import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryHoverComponent } from './summary-hover.component';

describe('SummaryHoverComponent', () => {
  let component: SummaryHoverComponent;
  let fixture: ComponentFixture<SummaryHoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryHoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
