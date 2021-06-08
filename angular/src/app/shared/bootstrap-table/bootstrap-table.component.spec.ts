import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BootstrapTableComponent } from './bootstrap-table.component';

describe('BootstrapTableComponent', () => {
  let component: BootstrapTableComponent;
  let fixture: ComponentFixture<BootstrapTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
