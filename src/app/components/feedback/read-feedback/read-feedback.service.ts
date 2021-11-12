import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Feedback} from "./feedback";
import {Observable} from "rxjs";
import {Candidate} from "../../models/candidate";
import {filter, map, switchMap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ReadFeedbackService {

  constructor(private http: HttpClient) {
  }

  // getCandidates(): Observable<Candidate[]> {
  //   return this.http.get<Candidate[]>(`${environment.api}/${this.apiUrl}`)
  //     .pipe(
  //       switchMap(candidates =>
  //         this.readFeedbackService.getFeedback()
  //           .pipe(
  //             map(feedback => candidates.map(c => {
  //                 return {...c, feedback: feedback.filter(f => f.candidateId == c.id)}
  //               })
  //             )
  //           )
  //       ),
  //       // tap(() => console.log('fetched candidates')),
  //       //   catchError(this.handleError('getCandidates', []))
  //     )
  // }

  getFeedback(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${environment.api}/feedback`)
    // .pipe(
    //   switchMap(feedback =>
    //     this.candidatesService.getCandidates()
    //       .pipe(
    //         map(feedback => candidates.map(c => {
    //             return {...c, feedback: feedback.filter(f => f.candidateId == c.id)}
    //           })
    //         )
    //       )
    //   ))
  }
}
