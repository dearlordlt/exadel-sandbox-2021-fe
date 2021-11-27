import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { StaticData } from '../../../components/models/staticData';
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

  getPlanningtoJoin(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.EXADEL_API}/${this.apiUrl}/Planning to Join`);
  }
}
