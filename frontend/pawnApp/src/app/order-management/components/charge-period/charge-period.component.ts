import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { OrderServices } from '../../services/order.service';
import { Order, Renewal } from '../../../interfaces';
import * as moment from 'moment';

/**
 * DongLai Component
 */
@Component({
  selector: 'app-charge-period',
  templateUrl: './charge-period.component.html',
  styleUrls: ['./charge-period.component.scss']
})
export class ChargePeriodComponent implements OnInit {
  @Input() orderEditing: Order;
  @Output() fireEvent = new EventEmitter<any>();
  renewals: [Renewal];
  openCreateRenewal: boolean = false;
  newFromDate: string;
  newToDate: string;
  newAmount: number = 0;
  errorMsg: any = [];

  constructor(private orderService: OrderServices) { }

  ngOnInit() {
    this.renewals = this.orderEditing.DongLai;
  }

  create() {
    this.openCreateRenewal = true;
    this.newFromDate = moment().format('DD/MM/YYYY');
    this.newToDate = moment().add(1, 'M').format('DD/MM/YYYY');
    this.newAmount = 0;
  }

  save() {
    this.errorMsg = [];

    if (!moment(this.newFromDate, 'DD/MM/YYYY', true).isValid()) {
      this.errorMsg.push('From date is invalid.');
    }

    if (!moment(this.newToDate, 'DD/MM/YYYY', true).isValid()) {
      this.errorMsg.push('To date is invalid.');
    }

    if (this.newAmount <= 0) {
      this.errorMsg.push('Amount should greater than 0');
    }

    if (this.errorMsg.length <= 0) {
      let saveFromDate = moment(this.newFromDate, 'DD/MM/YYYY');
      let saveToDate = moment(this.newToDate, 'DD/MM/YYYY');

      if (saveFromDate.isAfter(saveToDate)) {
        this.errorMsg.push('From date should be less than to date.');
      }

      if (this.errorMsg.length <= 0) {
        let postRenewal = <Renewal>{
          Amount: this.newAmount,
          FromDate: this.newFromDate,
          ToDate: this.newToDate
        };

        this.orderService.createRenewal(this.orderEditing._id, postRenewal).subscribe((orderReturn) => {
          this.orderEditing = orderReturn;
          this.renewals = this.orderEditing.DongLai;
          this.clearForm();
        });
        
      }

    }
  }

  cancel() {
    this.fireEvent.emit({ action: 'cancel', triggerReload: false });
  }

  cancelSave(){
    this.openCreateRenewal = false;
  }

  private clearForm() {
    this.newFromDate = this.newToDate = '';
    this.newAmount = 0;
    this.openCreateRenewal = false;
  }
}
