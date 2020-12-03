import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSuggestionsComponent } from './welcome-suggestions.component';

describe('WelcomeSuggestionsComponent', () => {
  let component: WelcomeSuggestionsComponent;
  let fixture: ComponentFixture<WelcomeSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
