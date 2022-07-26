import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecomposeToPlanetComponent } from './decompose-to-planet.component';

describe('DecomposeToPlanetComponent', () => {
  let component: DecomposeToPlanetComponent;
  let fixture: ComponentFixture<DecomposeToPlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecomposeToPlanetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecomposeToPlanetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
