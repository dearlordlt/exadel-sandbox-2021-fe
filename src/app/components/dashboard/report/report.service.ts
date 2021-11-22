import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getPrograms() {
    return this.http.get<any>(`${environment.api}/educationalPrograms`);
  }

  getReport(id: number) {
    return this.http.get<any>(`${environment.api}/GetForReport?eduProgId=${id}`);
  }
}
