import { Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(
      (data) => {
        console.log('data is', data);
        this.orders = data;
      },
      (err) => {
        console.log('err is', err);
      }
    );
  } 
  addOrder(id: string): void {
    const newOrder = {
      customer: id,
      product: 'aa',
      quantity: 12,
      price: 13,
    };
    this.orderService.addOrder(newOrder).subscribe(
      (data) => {
        console.log('data is', data);
      },
      (err) => {
        console.log('err is', err);
      }
    );
  }

  deleteOrder(id: string): void {
    if (confirm('Are you sure?')) {
      this.orderService.deleteOrder(id).subscribe(
        (data) => {
          console.log('data is', data);
        },
        (err) => {
          console.log('err is', err);
        }
      );
    }
  }
}
