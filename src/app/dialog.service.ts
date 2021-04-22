import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OrderService, Order } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private orderSrv: OrderService) {}
  confirm(message?: string): Observable<boolean> {
    const confirmation = window.confirm(message || 'Is it ok?');
    return of(confirmation);
  }

  getOrders(): Observable<Order[]> {
    return this.orderSrv.getOrders();
  }
}
