import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LogInData } from 'src/app/components/models/logInData';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly testUser = new LogInData('test@exadel.com', '123456')
  isAuthenticated = false;

  constructor(private router: Router) { }

  authenticate(logInData: LogInData): boolean{
    if(this.checkData(logInData)){
      this.isAuthenticated = true;
      this.router.navigate(['dashboard'])
      return true;
    }
    else {
      this.isAuthenticated = false;
      return false;
    }
  }
  private checkData(logInData: LogInData): boolean {
    return this.checkEmail(logInData.getEmail()) && this.checkPassword(logInData.getPassword());
  }
  email_val: boolean | null = null;
  private checkEmail(email: string): boolean{
  
    if(email === this.testUser.getEmail()) {
      this.email_val = true;
      return this.email_val;
    }
    else {
      this.email_val = false;
      return this.email_val;
    }
    
  }
  password_val: boolean | null = null;
  private checkPassword(password: string){
    if(password === this.testUser.getPassword()){
      this.password_val = true;
      return this.password_val;
    }
    else {
      this.password_val = false;
      return this.password_val;
    }
  }
  
  getEmailChecked(){
    return this.email_val;
  }
  getPasswordChecked(){
    return this.password_val;
  }
  logout(){
    this.isAuthenticated = false;
    this.router.navigate(['login'])
  }
}