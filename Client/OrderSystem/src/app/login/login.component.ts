import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginVerificationServiceService } from '../login-verification-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private loginService: LoginVerificationServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginVerification() {
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value).subscribe(result => {
        if (result) {
          localStorage.setItem('orderSessionToken', result);
          this.route.navigate(['marketplace']);
        } else {
          console.log(result);
        }
      });
    }
  }
}
