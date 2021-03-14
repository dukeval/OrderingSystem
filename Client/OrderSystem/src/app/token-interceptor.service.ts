import { LoginVerificationServiceService } from './login-verification-service.service';
import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<unknown>, next: HttpHandler) {
    let tokenizedReq;
    if (localStorage.getItem('orderSessionToken')) {
      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('orderSessionToken')}`
        }
      });

      return next.handle(tokenizedReq);
    } else {
      return next.handle(req);
    }
  }
}
