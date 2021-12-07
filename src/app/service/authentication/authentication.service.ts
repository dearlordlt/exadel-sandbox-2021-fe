import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LogInData } from 'src/app/components/models/logInData';
import { UserData } from 'src/app/components/models/userData';
import { EmployeeData } from 'src/app/components/models/employeeData';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated = localStorage.getItem('token') && localStorage.getItem('id') && localStorage.getItem('email') ? true : false;

  constructor(private router: Router, private http: HttpClient) {}

  authenticate(logInData: LogInData): Observable<UserData> {
    return this.http.post<UserData>(`${environment.EXADEL_API}/Employee/authenticate`, logInData);
  }

  getEmployee(id: string): Observable<EmployeeData> {
    return this.http.get<EmployeeData>(`${environment.EXADEL_API}/Employee/${id}`);
  }

  checkEmployee() {
    this.getEmployee(localStorage.getItem('id') || '').subscribe(
      (data) => {
        if (data.email !== localStorage.getItem('email')) {
          localStorage.clear();
          this.router.navigate(['login']);
        }
      },
      () => {
        localStorage.clear();
        this.router.navigate(['login']);
      }
    );
  }

  logout() {
    localStorage.clear();
    this.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
