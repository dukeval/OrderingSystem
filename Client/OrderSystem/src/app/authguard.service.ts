import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginVerificationServiceService } from './login-verification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  constructor(
    public auth: LoginVerificationServiceService,
    public router: Router
  ) {}
  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
