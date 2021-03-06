import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { CreateFeedback } from '../../../../components/models/feedback';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  candidateId = '';
  candidateName = '';
  candidateStatus = 0;

  constructor(private http: HttpClient) {}

  getEmployeeById(id: string) {
    return this.http.get<any>(`${environment.EXADEL_API}/Employee/${id}`);
  }

  writeFeedback(feedback: CreateFeedback) {
    return this.http.post<CreateFeedback>(`${environment.EXADEL_API}/Feedback/AddFeedback`, feedback);
  }

  getAllFeedback(candidateID: string) {
    return this.http.get<any>(`${environment.EXADEL_API}/Feedback/GetAllFeedbacks?CandidateID=${candidateID}`);
  }

  getFeedbackByID(id: string) {
    return this.http.get<any>(`${environment.EXADEL_API}/Feedback/Get?Id=${id}`);
  }
}
