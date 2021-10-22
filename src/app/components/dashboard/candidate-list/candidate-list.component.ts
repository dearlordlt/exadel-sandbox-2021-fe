import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { from } from 'rxjs';
import { CandidatesService } from './services/candidates.service';
import { ActivatedRoute } from '@angular/router';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  candidates: Candidate[] = [];

  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'eduProg',
    'position',
    'email',
    'phone_number',
    'country',
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

  // assessment: string[] = ['soft_skill', 'hard_skill', 'mentor_mark', 'interviewer_mark'];

  constructor(private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates(): void {
    this.candidatesService.getCandidates().subscribe((candidates) => (this.candidates = candidates));
  }
}
