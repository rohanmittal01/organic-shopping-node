import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreOrderDetailsComponent } from './more-order-details.component';

describe('MoreOrderDetailsComponent', () => {
  let component: MoreOrderDetailsComponent;
  let fixture: ComponentFixture<MoreOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
