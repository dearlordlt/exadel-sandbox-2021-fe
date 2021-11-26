import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Events } from 'src/app/components/models/events';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private apiUrl = 'events';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  getEvents(): Observable<Events[]> {
    return this.http.get<Events[]>(`${environment.api}/${this.apiUrl}`).pipe(
      tap(() => console.log('fetched candidates')),
      catchError(this.handleError('getEvents', []))
    );
  }

  // Create an event
  createEvent(event: Events): Observable<Events> {
    return this.http.post<Events>(this.apiUrl, event, httpOptions);
  }

  // Update event
  updateEvent(event: Events): Observable<Events> {
    const url = `${environment.api}/${event.id}`;
    return this.http.put<Events>(url, event, httpOptions);
  }

  // Delete an event
  deleteEvent(event: Events): Observable<Events> {
    const url = `${environment.api}/${event.id}`;
    return this.http.delete<Events>(url);
  }
}
