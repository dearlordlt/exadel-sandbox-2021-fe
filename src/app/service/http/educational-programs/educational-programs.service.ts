import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EducationalProgram } from '../../../components/shared/interfaces/educational-program/educational-program.interface';
import { PostEducationalProgram } from '../../../components/shared/interfaces/educational-program/post-educational-program.interface';
import { Position } from '../../../components/shared/interfaces/educational-program/educational-program.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EducationalProgramsService {
  constructor(private http: HttpClient) {}

  getEducationalPrograms(): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(`${environment.EXADEL_API}/EducationProgram/GetAllEducationProgramWithSortAndFilter`);
  }

  getEducationalProgramsForRegistration(): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(`${environment.EXADEL_API}/EducationProgram/GetForReg`);
  }

  getEducationalProgram(id: string): Observable<EducationalProgram> {
    return this.http.get<EducationalProgram>(`${environment.EXADEL_API}/EducationProgram/${id}`);
  }

  getEducationalProgramForRegistration(id: string): Observable<EducationalProgram> {
    return this.http.get<EducationalProgram>(`${environment.EXADEL_API}/EducationProgram/?id=${id}`);
  }

  postEducationalProgram(data: PostEducationalProgram): Observable<EducationalProgram> {
    return this.http.post<EducationalProgram>(`${environment.EXADEL_API}/EducationProgram/AddEducationProgram`, data);
  }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${environment.EXADEL_API}/Positions/GetAllPosition`);
  }
}
