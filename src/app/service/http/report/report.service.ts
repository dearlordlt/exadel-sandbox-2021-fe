import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {
  EducationalProgram
} from "../../../components/shared/interfaces/educational-program/educational-program.interface";

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {
  }

  getPrograms() {
    return this.http.get<any>(`${environment.EXADEL_API}/EducationProgram/GetAllEducationProgramWithSortAndFilter`);
  }

  getProgramById(id: string) {
    return this.http.get<any>(`${environment.EXADEL_API}/EducationProgram/${id}`);
  }

  getReport(id = '') {
    return this.http.get<any>(`${environment.EXADEL_API}/Candidates/GetForReport?educationProgramId=${id}`);
  }
}
