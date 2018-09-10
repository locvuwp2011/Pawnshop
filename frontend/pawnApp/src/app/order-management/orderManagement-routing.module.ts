import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderHomeComponent } from './order-home.component';

const routes: Routes = [
  { path: '', component: OrderHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRouteModule { }
