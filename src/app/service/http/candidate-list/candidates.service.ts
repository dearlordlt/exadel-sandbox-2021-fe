import { Injectable } from '@angular/core';
import { Candidate } from '../../../components/models/candidate';
import { concatMap, filter, catchError, map, tap, switchMap, toArray } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${environment.EXADEL_API}/Candidates/GetAllCandidates`).pipe(
      tap(() => console.log('fetched candidates')),
      catchError(this.handleError('getCandidates', [])),
    );
  }

  getCandidateById(id: string) {
    return this.http.get<Candidate>(`${environment.EXADEL_API}/Candidates/${id}`);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${environment.EXADEL_API}/Candidates/${candidate.id}`, candidate, headers);
  }

  filterData(searchText: string) {
  }

  constructor(private http: HttpClient) {
  }

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
}
