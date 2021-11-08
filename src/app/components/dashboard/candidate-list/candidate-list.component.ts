import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CandidatesService } from './services/candidates.service';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
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

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    //need this now to make search component work, should be removed when connected to actual backend
    this.candidatesService.getCandidates().subscribe((candidates) => (this.dataSource = candidates));
  }

  searchList(values: string[]) {
    const [program, status, name, email] = [...values];

    this.dataSource = this.dataSource.filter(
      (item) =>
        item.eduProg === (program === 'All' ? item.eduProg : program) &&
        item.status === (status === 'All' ? item.status : status) &&
        item.email.toLowerCase().includes(email.toLowerCase()) &&
        (item.firstname.toLowerCase().includes(name.toLowerCase()) || item.lastname.toLowerCase().includes(name.toLowerCase()))
    );
  }
}
