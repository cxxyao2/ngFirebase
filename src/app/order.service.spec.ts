import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Order, OrderService } from './order.service';
import { of, defer } from 'rxjs';

// order CRUD create update read delete
fdescribe('OrderService CRUD', () => {
  let http: HttpClient;
  let service: OrderService;
  let httpTestingController: HttpTestingController;
  let baseUrl = 'http://localhost:5000/api/orders';
  let order: Order;
  order = {
    customerPaid: false,
    enRoute: false,
    customerReceived: false,
    _id: '6086bb2b14798204152b48ff',
    customer: '5f9e3158ad9cfb1ef829357e',
    product: '603acd9018bc470ae0cf84cb',
    quantity: 12,
    price: 10,
    coupon: 'aaaa',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OrderService);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an order', () => {
    let result!: Order;
    let url = baseUrl + '/' + order._id;
    service.getOrder(order._id || '').subscribe((t: any) => {
      result = t;
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url,
    });
    req.flush(order);
    expect(result).toEqual(order);
  });

  it('should call delete order API', () => {
    service.deleteOrder(order._id || '').subscribe();
    const id = order._id;
    const req = httpTestingController.expectOne({
      method: 'DELETE',
      url: `${baseUrl}/${id}`,
    });

    expect(req).toBeDefined();
  });

  it('should call POST API to create a new order', () => {
    service.addOrder(order).subscribe();

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: baseUrl,
    });

    expect(req.request.body).toEqual(order);
  });

  it('should call put API to update an order', () => {
    service.updateOrder(order).subscribe();

    const req = httpTestingController.expectOne({
      method: 'PUT',
      url: `${baseUrl}/${order._id}`,
    });

    expect(req.request.body).toEqual(order);
  });

  it('can test for 404 4rror', () => {
    const emsg = 'deliberate 404 error';

    http.get('/data').subscribe(
      (data) => fail('should have failed with 404 errors'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(emsg, 'message');
      }
    );

    const req = httpTestingController.expectOne('/data');
    req.flush(emsg, {
      status: 404,
      statusText: 'No Found',
    });
  });
});
