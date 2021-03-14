import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  getProfile(): Observable<any> {
    return this.http.get(`http://127.0.0.1:5000/profile`);
  }

  constructor(private http: HttpClient) {}
}
