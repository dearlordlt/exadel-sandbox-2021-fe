import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LogInData } from 'src/app/components/models/logInData';
import { UserData } from 'src/app/components/models/userData';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = localStorage.getItem('token') ? true : false;

  constructor(private router: Router, private http: HttpClient) {}

  authenticate(logInData: LogInData): Observable<UserData> {
    return this.http.post<UserData>(`${environment.EXADEL_API}/Employee/authenticate`, logInData);

    // if (this.checkData(logInData)) {
    //   this.isAuthenticated = true;
    //   this.router.navigate(['dashboard']);
    //   return true;
    // } else {
    //   this.isAuthenticated = false;
    //   return false;
    // }
  }
  // private checkData(logInData: LogInData): boolean {
  //   return this.checkEmail(logInData.getEmail()) && this.checkPassword(logInData.getPassword());
  // }
  // email_val: boolean | null = null;
  // private checkEmail(email: string): boolean {
  //   if (email === this.testUser.getEmail()) {
  //     this.email_val = true;
  //     return this.email_val;
  //   } else {
  //     this.email_val = false;
  //     return this.email_val;
  //   }
  // }
  // password_val: boolean | null = null;
  // private checkPassword(password: string) {
  //   if (password === this.testUser.getPassword()) {
  //     this.password_val = true;
  //     return this.password_val;
  //   } else {
  //     this.password_val = false;
  //     return this.password_val;
  //   }
  // }

  // getEmailChecked() {
  //   return this.email_val;
  // }
  // getPasswordChecked() {
  //   return this.password_val;
  // }
  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
