import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {

  constructor(private http: HttpClient) {
  }

  getEmployeeById(id: string) {
    return this.http.get<any>(`${environment.EXADEL_API}/Employee/Get/${id}`);
  }
}
