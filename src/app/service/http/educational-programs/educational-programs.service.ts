import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EducationalProgram } from '../../../components/shared/interfaces/educational-program/educational-program.interface';
import { PostEducationalProgram } from 'src/app/components/dashboard/shared/interfaces/educational-program/post-educational-program.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EducationalProgramsService {
  constructor(private http: HttpClient) {
  }

  getEducationalPrograms(accep_per_from = '', prog_per_from = '', name = '', sort_col = '', sort_by = '', accep_per_to = '', prog_per_to = ''): Observable<EducationalProgram[]> {
    return this.http.get<EducationalProgram[]>(`${environment.EXADEL_API}/EducationProgram/GetAllEducationProgramWithSortAndFilter
    ?accep_per_from=${accep_per_from}
    &accep_per_to=${accep_per_to}
    &prog_per_from=${prog_per_from}
    &prog_per_to=${prog_per_to}
    &name=${name}
    &sort_col=${sort_col}
    &sort_by=${sort_by}`);
  }

  getEducationalProgram(id: string): Observable<EducationalProgram> {
    return this.http.get<EducationalProgram>(`${environment.EXADEL_API}/EducationProgram/${id}`);
  }

  postEducationalProgram(data: PostEducationalProgram): Observable<EducationalProgram> {
    return this.http.post<EducationalProgram>(`${environment.EXADEL_API}/EducationProgram/AddEducationProgram`, data);
  }
}
