import {Injectable} from '@angular/core';
import {Candidate} from "../../../models/candidate";
import {concatMap, filter, map, switchMap, toArray} from "rxjs/operators";
import {from, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  all(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(`${environment.api}/candidates`);
  }

  filterData(searchText: string) {

  }

  constructor(private http: HttpClient) {
    console.log(this.all().subscribe(p => console.log(p)))
  }
}
