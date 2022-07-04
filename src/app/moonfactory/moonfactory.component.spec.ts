import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonfactoryComponent } from './moonfactory.component';

describe('MoonfactoryComponent', () => {
  let component: MoonfactoryComponent;
  let fixture: ComponentFixture<MoonfactoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoonfactoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoonfactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
