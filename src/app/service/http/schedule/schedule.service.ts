import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EducationalProgram } from '../../../components/shared/interfaces/educational-program/educational-program.interface';
import { PostEducationalProgram } from '../../../components/shared/interfaces/educational-program/post-educational-program.interface';
import { Position } from '../../../components/shared/interfaces/educational-program/educational-program.interface';
import { Schedule } from 'src/app/components/shared/interfaces/schedule/schedule.interface';
import { PlannerComponent } from '../../../components/dashboard/planning/planner/planner.component'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  constructor(private http: HttpClient, public planner: PlannerComponent) {}
  date = this.planner.getDate();
  eduProgram = this.planner.getEducationalProgram()
  getSchedule(): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(`${environment.EXADEL_API}http://localhost:8080/api/InterviewSchedules/${this.eduProgram}/${this.date}`)
  }
}



