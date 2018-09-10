import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../../interfaces';
import { OrderServices } from '../../services/order.service';

@Component({
  selector: 'app-close-order',
  templateUrl: './close-order.component.html',
  styleUrls: ['./close-order.component.scss']
})
export class CloseOrderComponent implements OnInit {
  @Input() orderEditing: Order;
  @Output() fireEvent = new EventEmitter<any>();

  txtAmount: number = 0;
  rdbReason: string = '';
  txtNote: string = '';

  errorMsg: any = [];

  constructor(private orderService: OrderServices) { }

  ngOnInit() {
  }

  cancel() {    
    this.fireEvent.emit({ action: 'cancel_close_order', triggerReloadOrderList: false });
  }

  save() {
    this.errorMsg = [];

    if (this.txtAmount <= 0) {
      this.errorMsg.push('Invalid Amount');
    }

    if (this.rdbReason === 'Other' && !this.txtNote) {
      this.errorMsg.push('Please input the close reason.');
    }

    if (this.errorMsg.length === 0 && confirm('Are you agree to close this order?')) {
      let closeObj = {
        Amount: this.txtAmount,
        Reason: this.rdbReason,
        Note: this.txtNote
      };

      this.orderService.closeOrder(this.orderEditing._id, closeObj).subscribe(
        ord => {
        this.orderEditing = ord;
        this.fireEvent.emit({ action: 'save_close_order', triggerReloadOrderList: true });
      },
      err => {
        this.errorMsg.push(`Error - ${err}`);
      }
    );

      
    }
  }
}
