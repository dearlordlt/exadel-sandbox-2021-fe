import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthenticationService } from '../service/authentication/authentication.service';
import { LogInData } from '../components/models/logInData';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // logInForm = new FormGroup({
  //   email: new FormControl(),
  //   password: new FormControl()
  // });
  // onSubmit(logInForm: LogInData){
    
  //   const logInData = new LogInData(logInForm.getEmail(), logInForm.getPassword());
  //   this.authenticationService.authenticate(logInData); 
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

  ngOnInit(){
   
  }

  onSubmit(){
    const logInData = new LogInData(this.email.value, this.password.value);
    this.authenticationService.authenticate(logInData);   
  }
  
}