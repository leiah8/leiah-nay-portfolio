import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTablesComponent } from './block-tables.component';

describe('BlockTablesComponent', () => {
  let component: BlockTablesComponent;
  let fixture: ComponentFixture<BlockTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
