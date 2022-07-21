import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecomposeAsteroidsComponent } from './decompose-asteroids.component';

describe('DecomposeAsteroidsComponent', () => {
  let component: DecomposeAsteroidsComponent;
  let fixture: ComponentFixture<DecomposeAsteroidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecomposeAsteroidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecomposeAsteroidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
