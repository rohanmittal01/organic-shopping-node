import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeliverPersonComponent } from './admin-deliver-person.component';

describe('AdminDeliverPersonComponent', () => {
  let component: AdminDeliverPersonComponent;
  let fixture: ComponentFixture<AdminDeliverPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDeliverPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDeliverPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
