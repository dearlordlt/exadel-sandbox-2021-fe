import {Injectable} from '@angular/core';
import {Candidate} from '../../../models/candidate';
import {concatMap, filter, catchError, map, tap, switchMap, toArray} from 'rxjs/operators';
import {of, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ReadFeedbackService} from "../../read-feedback/read-feedback.service";

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  apiUrl: string = 'candidates';

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${environment.api}/${this.apiUrl}`)
      .pipe(
        switchMap(candidates =>
          this.readFeedbackService.getFeedback()
            .pipe(
              map(feedback => candidates.map(c => {
                  return {...c, feedback: feedback.filter(f => f.candidateId == c.id)}
                })
              ),
            )
        ),
        // tap(() => console.log('fetched candidates')),
        //   catchError(this.handleError('getCandidates', []))
      )
  }


  filterData(searchText: string) {
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`${environment.api}/${this.apiUrl}/${candidate.id}`, candidate, headers);
  }

  filterData(searchText: string) {}


  constructor(private http: HttpClient, private readFeedbackService: ReadFeedbackService) {
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
