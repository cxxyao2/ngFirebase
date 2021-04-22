// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { OrdersComponent } from './orders.component';
// import { Order, OrderService } from '../order.service';
// import { Observable, from, of } from 'rxjs';

// describe('OrdersComponent', () => {
//   let service: OrderService;
//   let component: OrdersComponent;

//   beforeEach(() => {
//     service = new OrderService(null);
//     component = new OrdersComponent(service);
//   });

//   it('should set orders property with the orders', () => {
//     const orders: Order[] = [
//       { customer: 'aa', product: 'bb1', quantity: 12, price: 12 },
//       { customer: 'ab', product: 'bb2', quantity: 12, price: 12 },
//     ];
//     spyOn(service, 'getOrders').and.callFake(() => {
//       return of(orders);
//     });

//     component.ngOnInit();
//     expect(component.orders.length).toBe(2);
//   });
// });
