import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanDeactivate } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { OrderReportComponent } from './order-report/order-report.component';

import { AuthGuard } from '../auth/auth.guard';
import { CanDeactivateGuard } from '../can-deactivate.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'creport',
            component: CustomerReportComponent,
          },
          { path: 'oreport', component: OrderReportComponent },
        ],
      },
    ],
  },
  {
    path: 'customer/:id',
    component: CustomerComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
