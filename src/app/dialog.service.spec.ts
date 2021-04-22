import { TestBed } from '@angular/core/testing';

import { DialogService } from './dialog.service';
import { OrderService, Order } from './order.service';

describe('DialogService without Angular testing support', () => {
  let service: DialogService;
  it('#getOrders should return faked value from a fake object', () => {
    const fake = {
      getOrders: () => [
        {
          customer: 'aa',
          product: 'p1',
          quantity: 1,
          price: 2,
        },
        {
          customer: 'bb',
          product: 'p2',
          quantity: 13,
          price: 2,
        },
      ],
    };
  });
});
