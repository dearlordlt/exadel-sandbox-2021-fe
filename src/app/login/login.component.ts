import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern(/@exadel/)]);
  password = new FormControl('',  [Validators.required, Validators.minLength(6)])
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a email';
    }
    if (this.email.hasError('pattern')) {
      return 'You must enter proper email containing @exadel';
    }
    if (this.password.hasError('minLength')) {
      return 'Your password must be more than 6 symbols'
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMesPas() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
    if (this.password.hasError('minLength')) {
      return 'Your password must be more than 6 symbols';
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}