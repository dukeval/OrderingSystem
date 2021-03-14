import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginVerificationServiceService } from '../login-verification-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formGroup!: FormGroup;
  error: string = '';

  constructor(
    private loginService: LoginVerificationServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      role: new FormControl('')
    });
  }

  registerUser(): void {
    if (this.formGroup.valid) {
      this.formGroup.controls.role.setValue('user');
      this.loginService.register(this.formGroup.value).subscribe(
        result => {
          if (result) {
            this.route.navigate(['login']);
          } else {
            this.error = result.error.message;
          }
        },
        errors => {
          this.error = errors.error.message;
        }
      );
    } else {
      this.validateForm();
    }
  }

  private validateForm() {
    this.formGroup.controls.name.value == ''
      ? this.formGroup.controls.name.markAsTouched({ onlySelf: true })
      : null;

    this.formGroup.controls.gender.value == ''
      ? this.formGroup.controls.gender.markAsTouched({ onlySelf: true })
      : null;

    this.formGroup.controls.birthday.value == ''
      ? this.formGroup.controls.birthday.markAsTouched({ onlySelf: true })
      : null;

    this.formGroup.controls.email.value == ''
      ? this.formGroup.controls.email.markAsTouched({ onlySelf: true })
      : null;

    this.formGroup.controls.username.value == ''
      ? this.formGroup.controls.username.markAsTouched({ onlySelf: true })
      : null;

    this.formGroup.controls.password.value == ''
      ? this.formGroup.controls.password.markAsTouched({ onlySelf: true })
      : null;
  }
}
