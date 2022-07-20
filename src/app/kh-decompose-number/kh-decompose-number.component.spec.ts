import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhDecomposeNumberComponent } from './kh-decompose-number.component';

describe('KhDecomposeNumberComponent', () => {
  let component: KhDecomposeNumberComponent;
  let fixture: ComponentFixture<KhDecomposeNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhDecomposeNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhDecomposeNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
