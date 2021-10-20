import {Component, OnInit} from '@angular/core';
import {filter, map, switchMap, take} from "rxjs/operators";
import {from} from "rxjs";
import {CandidatesService} from "./services/candidates.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  candidates$ = this.candidatesService.all();

  constructor(private candidatesService: CandidatesService) {
  }

  ngOnInit(): void {

  }

}
