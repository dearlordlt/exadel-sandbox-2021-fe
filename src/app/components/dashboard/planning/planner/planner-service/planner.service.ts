import { Injectable } from '@angular/core';

import { PlannerDataInt, DataObj1 } from '../plannerData';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PlannerService {
  private api = 'http://localhost:3000/EventData';
  constructor(private http: HttpClient) {}

  getEventData(): Observable<PlannerDataInt[]> {
    return this.http.get<PlannerDataInt[]>(this.api);
  }

  putEventData(id: string, data: PlannerDataInt): Observable<PlannerDataInt> {
    return this.http.put<PlannerDataInt>(`${this.api}/${id}`, data, headers);
  }
}
