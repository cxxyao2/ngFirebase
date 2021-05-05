import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ComposeMessageComponent } from './compose-message/compose-message.component';
import { EmployeeComponent } from './employee/employee.component';
import { PageNoteFoundComponent } from './page-note-found/page-note-found.component';
import { AuthGuard } from './auth/auth.guard';
import { HerolistComponent } from './heros/herolist/herolist.component';
import { HeroComponent } from './heros/hero/hero.component';
import { HwoToUnsubscribeComponent } from './00decorators/hwo-to-unsubscribe/hwo-to-unsubscribe.component';
import { HeroDetailComponent } from './heros/hero-detail/hero-detail.component';

const routes: Routes = [
  { path: 'howto', component: HwoToUnsubscribeComponent },
  { path: 'herolist', component: HerolistComponent },
  { path: 'herolist/detail', component: HeroDetailComponent },
  { path: 'hero/:id', component: HeroComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'compose', component: ComposeMessageComponent, outlet: 'popup' },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
  { path: '**', component: PageNoteFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
