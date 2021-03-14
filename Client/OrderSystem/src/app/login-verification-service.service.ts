//import { url } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginVerificationServiceService {
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

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
    const token = localStorage.getItem('orderSessionToken');

    if (token) return !this.jwtHelper.isTokenExpired(token);

    return false;
  }
}
