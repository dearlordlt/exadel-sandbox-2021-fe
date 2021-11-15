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

  private checkEmail(email: string): boolean{
    return email === this.testUser.getEmail();
  }
  
  private checkPassword(password: string){
    return password === this.testUser.getPassword();
  }
  logout(){
    this.isAuthenticated = false;
    this.router.navigate(['login'])
  }
}
