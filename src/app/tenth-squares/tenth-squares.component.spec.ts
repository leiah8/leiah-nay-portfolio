import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenthSquaresComponent } from './tenth-squares.component';

describe('TenthSquaresComponent', () => {
  let component: TenthSquaresComponent;
  let fixture: ComponentFixture<TenthSquaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenthSquaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenthSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
