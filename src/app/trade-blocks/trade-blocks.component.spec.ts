import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeBlocksComponent } from './trade-blocks.component';

describe('TradeBlocksComponent', () => {
  let component: TradeBlocksComponent;
  let fixture: ComponentFixture<TradeBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
