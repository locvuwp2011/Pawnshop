import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderManagementRouteModule } from './orderManagement-routing.module';
import { OrderHomeComponent } from './order-home.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderEditComponent } from './components/order-edit/order-edit.component';
import { OrderServices } from './services/order.service';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { GlobalService } from './global.service';
import { ChargePeriodComponent } from './components/charge-period/charge-period.component';
import { CloseOrderComponent } from './components/close-order/close-order.component';
import { UserService } from './services/user.service';
import { FindUserComponent } from './components/find-user/find-user.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrderManagementRouteModule
  ],
  declarations: [OrderHomeComponent, OrderListComponent, OrderEditComponent, ChargePeriodComponent, CloseOrderComponent, FindUserComponent],
  providers: [OrderServices, GlobalService, UserService]
})
export class OrderManagementModule { }
