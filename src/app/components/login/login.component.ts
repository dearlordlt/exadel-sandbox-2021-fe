import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { LogInData } from '../models/logInData';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserData } from '../models/userData';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  logInForm: FormGroup = this.fb.group({
    username: '',
    email: ['', [Validators.required, Validators.pattern(/@exadel.com/)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  hide = true;
  getErrorMessage() {
    if (this.logInForm.controls['email'].hasError('required')) {
      return 'You must enter a email';
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

  constructor(private authenticationService: AuthenticationService, private fb: FormBuilder, private http: HttpClient) {}
  result = true;
  
  ngOnInit() {}
  onSubmit() {
    console.log(this.logInForm.controls['username'].value)
    console.log(this.logInForm.controls['password'].value)
    const logInData = new LogInData(this.logInForm.controls['username'].value, this.logInForm.controls['password'].value);
    console.log(logInData)
    this.authenticationService.getAuth(logInData);

    // const logInData = new LogInData(this.logInForm.controls['email'].value, this.logInForm.controls['password'].value);
    // this.authenticationService.authenticate(logInData);
    // this.result = this.authenticationService.authenticate(logInData);
    // console.log(this.result);
  
  }
}
