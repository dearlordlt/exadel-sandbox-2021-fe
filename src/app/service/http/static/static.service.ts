import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StaticData, FeedbackType } from '../../../components/models/staticData';
@Injectable({
  providedIn: 'root',
})
export class StaticService {
  private apiUrl = 'StaticsData';
  constructor(private http: HttpClient) {}

  getEnglishLevels(): Observable<StaticData> {
    return this.http.get<StaticData>(`${environment.EXADEL_API}/${this.apiUrl}/English Levels`);
  }

  getTimeSlots(): Observable<StaticData> {
    return this.http.get<StaticData>(`${environment.EXADEL_API}/${this.apiUrl}/Time Slots`);
  }

  getCandidateStatus(): Observable<StaticData> {
    return this.http.get<StaticData>(`${environment.EXADEL_API}/${this.apiUrl}/Candidate Status`);
  }

  getFeedbackType(): Observable<FeedbackType[]> {
    return this.http.get<FeedbackType[]>(`${environment.EXADEL_API}/${this.apiUrl}/Feedback Type`);
  }

  getPlanningtoJoin(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.EXADEL_API}/${this.apiUrl}/Planning to Join`);
  }

  getListofCountries(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.EXADEL_API}/${this.apiUrl}/List of Countries`);
  }
}
