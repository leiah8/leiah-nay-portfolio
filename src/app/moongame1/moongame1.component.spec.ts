import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Moongame1Component } from './moongame1.component';

describe('Moongame1Component', () => {
  let component: Moongame1Component;
  let fixture: ComponentFixture<Moongame1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Moongame1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Moongame1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
