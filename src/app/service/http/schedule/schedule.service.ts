import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from 'src/app/components/shared/interfaces/schedule/schedule.interface';
import { Employee } from 'src/app/components/shared/interfaces/schedule/employee.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}

  getSchedule(educationalProgramId: string, date: string): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${environment.EXADEL_API}/InterviewSchedules/${educationalProgramId}/${date}`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${environment.EXADEL_API}/Employee/GetEmployees`);
  }
}
