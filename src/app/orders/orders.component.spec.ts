import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { Order, OrderService } from '../order.service';
import { Observable, EMPTY } from 'rxjs';
import { asyncData } from '../testing/async-observable-helpers';

fdescribe('OrdersComponent-No TestBed', () => {
  let orderService: any;
  let component: OrdersComponent;

  const newOrder: Order = {
    _id: 'mongodb133',
    customer: 'cust_123',
    product: 'aa',
    quantity: 12,
    price: 13,
  };

  beforeEach((done: DoneFn) => {
    orderService = jasmine.createSpyObj('OrderService', [
      'getOrders',
      'addOrder',
      'deleteOrder',
    ]);

    orderService.getOrders.and.returnValue(asyncData([newOrder]));
    orderService.addOrder.and.returnValue(asyncData(newOrder));
    orderService.deleteOrder.and.returnValue(asyncData(newOrder));

    component = new OrdersComponent(orderService);
    component.ngOnInit();

    // onInit calles orderService.getOrders; wait for it to get the fake hero
    orderService.getOrders.calls.first().returnValue.subscribe(done);
  });

  it('should call the server to delete an order when confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteOrder(newOrder._id || '');
    expect(orderService.deleteOrder.calls.any()).toBe(
      true,
      'delete order is called'
    );
  });

  it('should not delete an order when cancel', () => {
    // window.confirm
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteOrder(newOrder._id || '');
    expect(orderService.deleteOrder.calls.any()).toBe(
      false,
      'delete order is not called'
    );
  });
});
