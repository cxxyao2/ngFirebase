import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { OrderReportComponent } from './order-report/order-report.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerComponent,
    CustomerReportComponent,
    OrderReportComponent,
  ],
  imports: [CommonModule, FormsModule, CustomersRoutingModule],
})
export class CustomersModule {}
