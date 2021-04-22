import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

import { Order, OrderService } from './order.service';
import { of, defer } from 'rxjs';

fdescribe('OrderService', () => {
  let service: OrderService;
  let httpClientSpy: { get: jasmine.Spy };


  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new OrderService(httpClientSpy as any);
  });

  it('should return expected orders (HttpClient called once)', () => {
    const expectedOrders: Order[] = [
      { customer: 'aa', product: 'pr11', quantity: 12, price: 13 },
      { customer: 'bb', product: 'pr12', quantity: 123, price: 13 },
    ];
    const expectedOrders2: Order[] = [
      { customer: 'aa', product: 'pr11', quantity: 12, price: 13 },
      { customer: 'bb', product: 'pr12', quantity: 123, price: 13 },
      { customer: 'cc', product: 'pr13', quantity: 123, price: 13 },
    ];
    httpClientSpy.get.and.returnValue(of(expectedOrders));

    service
      .getOrders()
      .subscribe(
        (orders) => expect(orders).toEqual(expectedOrders, 'expected orders'),
        fail
      );

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  // it('should return an error when the server returns a 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found',
  //   });

  //   httpClientSpy.get.and.returnValue(of(errorResponse));

  //   service.getOrders().subscribe(
  //     (orders) => fail('404 error'),
  //     (error) => expect(error.message).toContain('error')
  //   );
  // });
  // TODO ADD DELETE UPDATE SELECT && Criteria
});
