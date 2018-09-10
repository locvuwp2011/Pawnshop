import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../interfaces';
import * as moment from 'moment';
import { OrderListComponent } from './components/order-list/order-list.component';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.scss']
})
export class OrderHomeComponent implements OnInit {
  openEditOrder: boolean = false;
  openDongLai: boolean = false;
  openCloseOrder: boolean = false;

  currentDate: string;
  orderEditing: Order;
  
  orderTodayTitle: string;

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.currentDate = moment().format('DD/MM/YYYY');

    this.orderTodayTitle = `Today - ${this.currentDate}`;
  }

  setDisplayOrderEdit(isDisplay: boolean) {
    this.openEditOrder = isDisplay
    this.orderEditing = null;

    this.globalService.triggerReloadOrderList(false);
  }

  selectOrderEvent(obj: any) {
    this.openEditOrder = this.openDongLai = this.openCloseOrder = false;

    switch (obj.action) {
      case 'edit':
        this.openEditOrder = true;
        this.orderEditing = obj.order;
        break;
      case 'donglai':
        this.openDongLai = true;
        this.orderEditing = obj.order;
        break;
      case 'close':
        this.openCloseOrder = true;
        this.orderEditing = obj.order;
        break;
      default:
        alert('There are no action valid');
        break;
    }
  }

  orderEditEvent(triggerReloadOrderList: boolean) {
    if (triggerReloadOrderList) {
      this.globalService.triggerReloadOrderList(true);
    }

    this.setDisplayOrderEdit(false);
  }

  catchChangePeriod(triggerReloadOrderList: boolean) {
    if (triggerReloadOrderList) {
      this.globalService.triggerReloadOrderList(true);
    }

    this.openDongLai = false;
  }

  catchCloseOrder(obj: any) {
    this.openCloseOrder = false;

    switch (obj.action) {
      case 'cancel_close_order':
        break;
      case 'save_close_order':
        if (obj.triggerReloadOrderList)
          this.globalService.triggerReloadOrderList(true);
        break;
      default:
        alert('There are no action valid');
        break;
    }
  }

}
