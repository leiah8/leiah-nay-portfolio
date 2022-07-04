import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetfactoryComponent } from './planetfactory.component';

describe('PlanetfactoryComponent', () => {
  let component: PlanetfactoryComponent;
  let fixture: ComponentFixture<PlanetfactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetfactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetfactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
