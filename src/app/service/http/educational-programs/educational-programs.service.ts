import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EducationalProgram } from '../../../components/shared/interfaces/educational-program/educational-program.interface';

@Injectable({
  providedIn: 'root',
})
export class EducationalProgramsService {
  constructor(private http: HttpClient) {}

  getEducationalPrograms(): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(`${environment.exadelApi}/EducationProgram/GetAllEducationProgram`);
  }

  getEducationalProgram(id: string): Observable<EducationalProgram> {
    return this.http.get<EducationalProgram>(`${environment.exadelApi}/EducationProgram/${id}`);
  }
}
