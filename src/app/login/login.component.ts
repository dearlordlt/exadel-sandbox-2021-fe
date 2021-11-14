import { Component, OnInit } from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
import { AuthenticationService } from '../service/authentication/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMesPas() {
    if (this.password.hasError('required')) {
      return 'You must enter a password';
    }
    if (this.password.hasError('minlength')) {
      return 'Your password must be more than 6 symbols';
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }
  
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(logInForm: NgForm){
    console.log(logInForm.value);
    // console.log(this.email);
    // console.log(this.password);

  // const logInData = new LogInData(logInForm.value.email, logInForm.value.password);
  const logInData = (logInForm.value.email, logInForm.value.password);
  this.authenticationService.authenticate(logInData);
  }
}