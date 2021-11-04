import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { educationalPrograms } from 'src/app/global/constants';
import { statuses } from 'src/app/global/constants';

@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.scss'],
})
export class SearchCandidateComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    searchEduProgram: 'All',
    searchStatus: 'All',
    searchName: '',
    searchEmail: '',
  });
  @Output() searchEvent = new EventEmitter();

  programs = educationalPrograms;
  status = statuses;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  clickSearch() {
    this.searchEvent.emit([
      this.searchForm.value.searchEduProgram,
      this.searchForm.value.searchStatus,
      this.searchForm.value.searchName,
      this.searchForm.value.searchEmail,
    ]);
  }
}
