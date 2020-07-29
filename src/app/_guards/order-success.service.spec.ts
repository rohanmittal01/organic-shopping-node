import { TestBed } from '@angular/core/testing';

import { OrderSuccessService } from './order-success.service';

describe('OrderSuccessService', () => {
  let service: OrderSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
