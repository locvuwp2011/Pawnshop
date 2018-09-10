import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Order, Renewal } from '../../interfaces';
import { Observable, of } from 'rxjs';

@Injectable()
export class OrderServices {
  private apiUrl: string = 'http://localhost:3000/Order';
  private headers: any = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private _http: HttpClient) { }

  getOrdersByDate(date: string) {
    return this._http.get<Order[]>(this.apiUrl + '/date/' + encodeURIComponent(date));
  }

  getOrder(orderID: string) {
    return this._http.get<Order>(this.apiUrl + '/' + orderID);
  }

  getOrdersWarning() {
    return of(null); //this._http.get<Order[]>(this.apiUrl + '/warning');
  }

  getOrdersExpired(){
    return of(null); //this._http.get<Order[]>(this.apiUrl + '/expired');
  }

  addOrder(order: Order) {
    return this._http.post<Order>(this.apiUrl + '/create', order, { headers: this.headers });
  }

  updateOrder(_id: string, orderEdit: Order) {
    return this._http.put(this.apiUrl + '/' + _id, orderEdit, { headers: this.headers });
  }

  createRenewal(orderID: string, renewal: Renewal) {
    return this._http.post<Order>(this.apiUrl + '/donglai/' + orderID, renewal, { headers: this.headers });
  }

  closeOrder(orderID: string, closeObj: any) {
    return this._http.post<Order>(this.apiUrl + '/ThanhLy/' + orderID, closeObj, { headers: this.headers })
  }

  private errorHandler(err: any) {
    console.log('Something wrong happen', err);
  }
}
