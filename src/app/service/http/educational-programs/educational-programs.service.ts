import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  getEducationalPrograms(
    name = '',
    accep_per_from = '',
    prog_per_from = '',
    sort_col = '',
    sort_by = ''
  ): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(
      `${environment.EXADEL_API}/EducationProgram/GetAllEducationProgramWithSortAndFilter?name=${name}&accep_per_from=${accep_per_from}&prog_per_from=${prog_per_from}&sort_col=${sort_col}&sort_by=${sort_by}`
    );
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

  updateEducationalProgram(id: string, data: EducationalProgram): Observable<EducationalProgram> {
    const params = new HttpParams().set('Id', id);
    return this.http.put<EducationalProgram>(`${environment.EXADEL_API}/EducationProgram/`, data, { params: params });
  }

  getPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${environment.EXADEL_API}/Positions/GetAllPosition`);
  }
}
