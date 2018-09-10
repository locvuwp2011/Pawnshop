import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Order, User } from '../../../interfaces';
import { OrderServices } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
/** 
 * Input
 *  - orderEditing -> order object to modify
*/

export class OrderEditComponent implements OnInit {
  @Input() orderEditing: Order;
  @Output() orderEmitter = new EventEmitter<boolean>();

  orderData: Order;
  orderForm: FormGroup;
  status: string;
  isSubmitted: boolean = false;
  errorMessage: string;
  userReadOnly: boolean = false;

  constructor(private orderService: OrderServices, private renderer: Renderer2, private userService: UserService) { }

  ngOnInit() {
    if (this.orderEditing) {
      this.status = 'Editing';
      this.orderData = JSON.parse(JSON.stringify(this.orderEditing));
    }
    else {
      this.status = 'Creating';
      this.orderData = <Order>{};
    }

    this.initializeForm();

    this.renderer.selectRootElement('#txtFullname').focus();
  }

  private initializeForm() {
    this.orderForm = new FormGroup({
      Fullname: new FormControl(this.orderData.Fullname, [Validators.required]),
      Address: new FormControl(this.orderData.Address, [Validators.required]),
      PhoneNumber: new FormControl(this.orderData.PhoneNumber, [Validators.required]),
      ProductType: new FormControl(this.orderData.ProductType, [Validators.required]),
      Amount: new FormControl(this.orderData.Amount, [Validators.required]),
      Identify: new FormControl(this.orderData.Identify),
      Description: new FormControl(this.orderData.Description),
      Note: new FormControl(this.orderData.Note),
      Rate1: new FormControl(this.orderData.Rate1),
      Rate2: new FormControl(this.orderData.Rate2),
      Rate3: new FormControl(this.orderData.Rate3),
      Rate4: new FormControl(this.orderData.Rate4),
      ExtraFee: new FormControl(this.orderData.ExtraFee)
    });
  }

  isValid(controlName: string) {
    if (!this.isSubmitted) return '';

    return this.orderForm.controls[controlName].valid ? 'is-valid' : 'is-invalid';
  }

  save() {
    this.errorMessage = null;

    this.isSubmitted = true;

    if (this.orderForm.valid) {
      let orderSave = <Order>{
        Fullname: this.orderForm.controls['Fullname'].value,
        Address: this.orderForm.controls['Address'].value,
        PhoneNumber: this.orderForm.controls['PhoneNumber'].value,
        ProductType: this.orderForm.controls['ProductType'].value,
        Amount: this.orderForm.controls['Amount'].value,
        Identify: this.orderForm.controls['Identify'].value,
        Description: this.orderForm.controls['Description'].value,
        Note: this.orderForm.controls['Note'].value,
        ExtraFee: this.orderForm.controls['ExtraFee'].value,
        Rate1: this.orderForm.controls['Rate1'].value,
        Rate2: this.orderForm.controls['Rate2'].value,
        Rate3: this.orderForm.controls['Rate3'].value,
        Rate4: this.orderForm.controls['Rate2'].value
      };

      if (this.status === 'Creating') {
        let userSave = <User>{
          Fullname: this.orderForm.controls['Fullname'].value,
          Identify: this.orderForm.controls['Identify'].value,
          Address: this.orderForm.controls['Address'].value,
          PhoneNumber: this.orderForm.controls['PhoneNumber'].value,
          PictureUrl: ''
        };

        this.userService.create(userSave).subscribe(userRes => {
          orderSave.UserID = userRes._id;
          this.orderService.addOrder(orderSave).subscribe(() => { this.orderEmitter.emit(true) });
        });

      } else {
        this.orderService.updateOrder(this.orderEditing._id, orderSave).subscribe(() => { this.orderEmitter.emit(true) });
      }
    } else {
      this.errorMessage = 'There are something wrong happen.'
    }
  }

  reset() {
    this.initializeForm();
  }

  cancel() {
    this.orderEmitter.emit(false);
  }

  catchFindUser(userSelected: User) {    
    this.orderForm.controls['Fullname'].setValue(userSelected.Fullname);
    this.orderForm.controls['Identify'].setValue(userSelected.Identify);
    this.orderForm.controls['Address'].setValue(userSelected.Address);
    this.orderForm.controls['PhoneNumber'].setValue(userSelected.PhoneNumber);
    
    this.setDisableControls(['Fullname', 'Identify', 'Address', 'PhoneNumber']);
  }

  private setDisableControls(fieldNames: string[]){
    fieldNames.forEach(x=> this.orderForm.controls[x].disable());
  }
}
