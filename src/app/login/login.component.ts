import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // username = '';
  // password1 = '';
  // isValidName = true;
  // isValidPassword = true;
  // isBtnEnabled = false;
  // onType(event: any) {
  //   if (event.target.id === 'input--username') {
  //     this.username = event.target.value;
  //     this.isValidName = this.username.match(/@exadel.com$/) ? true : false;
  //   }

  //   if (event.target.id === 'input--password') {
  //     this.password1 = event.target.value;
  //     this.isValidPassword = this.password1.length > 5 ? true : false;
  //   }
  //   this.isBtnEnabled = this.isValidName && this.isValidPassword;
  //   console.log(this.isBtnEnabled);
  // }
  email = new FormControl('', [Validators.required, Validators.email, Validators.pattern(/@exadel.com/)]);
  password = new FormControl('',  [Validators.required, Validators.minLength(6)])
  hide = true;
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a email';
    }
    if (this.email.hasError('pattern')) {
      return 'You must enter proper email containing @exadel.com';
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

  onSubmit(logInForm: NgForm){
    console.log(logInForm.value)
    // console.log(this.username);
    // console.log(this.password1);
  }
}