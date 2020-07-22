import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPersonFormComponent } from './delivery-person-form.component';

describe('DeliveryPersonFormComponent', () => {
  let component: DeliveryPersonFormComponent;
  let fixture: ComponentFixture<DeliveryPersonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryPersonFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
