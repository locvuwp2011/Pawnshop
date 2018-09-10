import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { OrderServices } from '../../services/order.service';
import { Order } from '../../../interfaces';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit, OnDestroy {

  @Input() date: string;
  @Output() selectOrderEmitter = new EventEmitter<any>();
  @Input() orderType: string = '';
  @Input() title: string = '';
  
  currentDate: Date;
  ords: Order[];

  private subscribes: any = [];

  constructor(private orderService: OrderServices, private globalService: GlobalService) { }

  ngOnInit() {
    this.currentDate = new Date();

    this.loadOrders();

    let subcribe = this.globalService.$triggerReloadOrderList.subscribe((trigger) => {
      if (trigger)
        this.loadOrders();
    });

    this.subscribes.push(subcribe);
  }

  editOrder(ord: Order) {
    this.selectOrderEmitter.emit({ action: 'edit', order: ord });
  }

  loadOrders() {
    switch (this.orderType) {
      case 'Warning':
        this.orderService.getOrdersWarning().subscribe((data) => {
          this.ords = data as Order[];
        });
        break;
      case 'Expired':
        this.orderService.getOrdersExpired().subscribe((data) => {
          this.ords = data as Order[];
        });
        break;
      default:
        this.orderService.getOrdersByDate(this.date).subscribe((data) => {
          this.ords = data as Order[];
        });
        break;
    }

    
  }

  dongLai_click(ord: Order) {
    this.selectOrderEmitter.emit({ action: 'donglai', order: ord });
  }

  closeOrder_click(ord: Order) {
    this.selectOrderEmitter.emit({ action: 'close', order: ord });
  }

  ngOnDestroy(): void {
    if (this.subscribes)
      this.subscribes.forEach(sub => { sub.unsubscribe(); })
  }

}
