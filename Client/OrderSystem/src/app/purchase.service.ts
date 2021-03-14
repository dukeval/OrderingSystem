import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from 'selenium-webdriver/firefox';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  getInventory(): Observable<any> {
    return this.http.get(`http://127.0.0.1:5000/inventories`);
  }
  constructor(private http: HttpClient) {}

  getPurchases(): Observable<any> {
    return this.http.get(`http://127.0.0.1:5000/orders`);
  }

  itemPurchased(purchases: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: '*/*'
    });

    console.log(purchases);
    return this.http.request('post', `http://127.0.0.1:5000/order`, {
      body: {
        orders: purchases
      }
    });
  }

  buildInventory(): Observable<any> {
    return this.http.get(`http://127.0.0.1:5000/buildInventory`);
  }
}
