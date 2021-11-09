import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { educationalPrograms } from 'src/app/global/constants';
import { statuses } from 'src/app/global/constants';

import { CandidatesService } from '../../dashboard/candidate-list/services/candidates.service';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-search-candidates',
  templateUrl: './search-candidates.component.html',
  styleUrls: ['./search-candidates.component.scss'],
})
export class SearchCandidatesComponent implements OnInit {
  // This whole component will need to be refactored once we get the API

  searchForm: FormGroup = this.fb.group({
    searchEducationalProgram: 'All',
    searchStatus: 'All',
    searchName: '',
    searchEmail: ['', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
  });

  allCandidates: Candidate[] = [];
  searchedCandidates: Candidate[] = [];

  @Output() searchEvent: EventEmitter<Candidate[]> = new EventEmitter();

  educationalPrograms = educationalPrograms;
  statuses = statuses;

  constructor(private fb: FormBuilder, private candidatesService: CandidatesService) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.candidatesService.getCandidates().subscribe((candidates) => (this.allCandidates = candidates));

    //need this now to make search component work, should be removed when connected to actual backend
    this.candidatesService.getCandidates().subscribe((candidates) => (this.searchedCandidates = candidates));
  }

  searchCandidates(values: string[]) {
    const [program, status, name, email] = [...values];

    this.searchedCandidates = this.allCandidates.filter(
      (item) =>
        item.eduProg === (program === 'All' ? item.eduProg : program) &&
        item.status === (status === 'All' ? item.status : status) &&
        item.email.toLowerCase().includes(email.toLowerCase()) &&
        (item.firstname.toLowerCase().includes(name.toLowerCase()) || item.lastname.toLowerCase().includes(name.toLowerCase()))
    );
  }

  clickSearch() {
    const searchFormValues: string[] = [
      this.searchForm.controls['searchEducationalProgram'].value,
      this.searchForm.controls['searchStatus'].value,
      this.searchForm.controls['searchName'].value,
      this.searchForm.controls['searchEmail'].value,
    ];

    this.searchCandidates(searchFormValues);

    this.searchEvent.emit(this.searchedCandidates);

    this.getCandidates;
  }
}
