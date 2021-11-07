import {Component, OnInit, AfterViewInit, ViewChild, Input} from '@angular/core';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {CandidatesService} from './services/candidates.service';
import {Candidate} from '../../models/candidate';
import {Router} from "@angular/router";
import {ReadFeedbackService} from "../read-feedback/read-feedback.service";

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];
  dataSource: Candidate[] = [];

  displayedColumns: string[] = [
    'edit',
    'firstname',
    'lastname',
    'eduProg',
    'position',
    'email',
    'skype',
    'phone_number',
    'country',
    'city',
    'english_level',
    'contact_time',
    'plan_to_join',
    'date_of_apply',
    'status',
    'soft_skill',
    'hard_skill',
    'mentor_mark',
    'interviewer_mark',
  ];

  constructor(private candidatesService: CandidatesService, private readFeedbackService: ReadFeedbackService,
              private router: Router
  ) {
  }

  ngOnInit()
    :
    void {
    this.getCandidates();
  }

  getCandidates() {
    this.candidatesService.getCandidates().subscribe((candidates) => (this.candidates = candidates));

    //need this now to make search component work, should be removed when connected to actual backend
    this.candidatesService.getCandidates().subscribe((candidates) => (this.dataSource = candidates));
  }

  searchList(values
               :
               string[]
  ) {
    const [program, status, name, email] = [...values];

    this.dataSource = this.candidates.filter(
      (item) =>
        item.eduProg === (program === 'All' ? item.eduProg : program) &&
        item.status === (status === 'All' ? item.status : status) &&
        item.email.toLowerCase().includes(email.toLowerCase()) &&
        (item.firstname.toLowerCase().includes(name.toLowerCase()) || item.lastname.toLowerCase().includes(name.toLowerCase()))
    );
  }

  writeFeedback() {
    this.router.navigateByUrl('/write_feedback').then()
  }

  readFeedback() {
    this.router.navigateByUrl('/read_feedback').then()
  }
}
