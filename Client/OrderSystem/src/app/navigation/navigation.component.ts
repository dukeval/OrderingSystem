import { Component, OnInit } from '@angular/core';
import { LoginVerificationServiceService } from '../login-verification-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loginService!: LoginVerificationServiceService;

  constructor(
    private loginSrvc: LoginVerificationServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginService = this.loginSrvc;
  }

  logOut() {
    localStorage.removeItem('orderSessionToken');
    this.route.navigate(['']);
  }
}
