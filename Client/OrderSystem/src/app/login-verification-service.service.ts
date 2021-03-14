//import { url } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginVerificationServiceService {
  constructor(private http: HttpClient) {}

  login(loginCredentials: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:5000/login`, loginCredentials);
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:5000/register`, credentials);
  }

  // adminRegistration(credentials: any): Observable<any> {
  //   return this.http.post(`http://127.0.0.1:5000/register`, credentials);
  // }

  isLoggedIn() {
    return localStorage.getItem('orderSessionToken') ? true : false;
  }
}
