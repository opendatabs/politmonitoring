import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterializeTableComponent } from './materialize-table.component';

describe('MaterializeTableComponent', () => {
  let component: MaterializeTableComponent;
  let fixture: ComponentFixture<MaterializeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterializeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterializeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
