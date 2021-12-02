import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CreateFeedback } from '../../../../components/models/feedback';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  candidateId = '';
  candidateName = '';

  constructor(private http: HttpClient) {
  }

  getEmployeeById(id: string) {
    return this.http.get<any>(`${environment.EXADEL_API}/Employee/Get/${id}`);
  }

  writeFeedback(feedback: CreateFeedback) {
    return this.http.post<CreateFeedback>(`${environment.EXADEL_API}/Feedback/AddFeedback`, feedback);
  }

}
