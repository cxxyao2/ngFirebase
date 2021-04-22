import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { Order, OrderService } from './order.service';

// Test succeeded.
fdescribe('OrderService', () => {
  let httpTestingController: HttpTestingController;
  let service: OrderService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = TestBed.inject(OrderService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should return an error when the server returns a 404', () => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'test 404 error',
  //     status: 404,
  //     statusText: 'Not Found',
  //   });

  //   httpClientSpy.get.and.returnValue(asyncError(errorResponse));

  //   service.getOrders().subscribe(
  //     (data) => fail('expected an error, not heroes'),
  //     (error) => expect(error.message).toContain('test 404 error'),
  //     () => {
  //       // done();
  //     }
  //   );
  // });

  // TODO ADD DELETE UPDATE SELECT && Criteria
});

function asyncError(errorMessage: any) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(errorMessage);
    }, 1000);
  });
}
