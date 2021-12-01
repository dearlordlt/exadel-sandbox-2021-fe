import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { LogInData } from '../models/logInData';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(/@exadel.com/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  hide = true;
  getErrorMessage() {
    if (this.logInForm.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }
    if (this.logInForm.controls['email'].hasError('pattern')) {
      return 'You must enter proper email containing @exadel.com';
    }
    return 'Not a valid email';
  }
  getErrorMesPas() {
    if (this.logInForm.controls['password'].hasError('required')) {
      return 'You must enter a password';
    }
    if (this.logInForm.controls['password'].hasError('minlength')) {
      return 'Your password must at least 6 symbols';
    }
    return 'Not a valid password';
  }

  getLoginRejected() {
    return 'Your email or password is incorrect';
  }

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private router: Router) {}
  result = true;

  ngOnInit() {}
  onSubmit() {
    const logInData = new LogInData(this.logInForm.controls['email'].value, this.logInForm.controls['password'].value);
    this.authenticationService.authenticate(logInData).subscribe(
      (userData) => {
        localStorage.setItem('id', userData.id);
        localStorage.setItem('email', userData.email);
        localStorage.setItem('token', userData.token);
        this.authenticationService.isAuthenticated = true;
        this.router.navigate(['dashboard']);
      },
      () => {
        this.result = false;
      }
    );
  }
}
