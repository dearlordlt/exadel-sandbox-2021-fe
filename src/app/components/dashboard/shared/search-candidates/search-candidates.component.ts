import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Candidate } from '../../../models/candidate';
import { EducationalProgramsService } from 'src/app/service/http/educational-programs/educational-programs.service';
import { EducationalProgram } from 'src/app/components/shared/interfaces/educational-program/educational-program.interface';
import { StaticService } from 'src/app/service/http/static/static.service';
import { CandidatesService } from '../../candidates/services/candidates.service';

@Component({
  selector: 'app-search-candidates',
  templateUrl: './search-candidates.component.html',
  styleUrls: ['./search-candidates.component.scss'],
})
export class SearchCandidatesComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    searchEducationalProgram: ' ',
    searchStatus: '',
    searchName: '',
    searchEmail: ['', [Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]],
  });

  educationalPrograms: EducationalProgram[] = [];
  statuses: string[] = [];

  @Output() searchEvent: EventEmitter<Candidate[]> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private educationalProgramsService: EducationalProgramsService,
    private staticService: StaticService,
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    this.getEducationalPrograms();
    this.getStatuses();
  }

  getEducationalPrograms(): void {
    this.educationalProgramsService.getEducationalPrograms().subscribe((data: EducationalProgram[]) => {
      this.educationalPrograms = data;
      // Adding edu program with an empty id to the beggining for the "All" option in mat-select
      this.educationalPrograms.unshift({
        id: '',
        name: 'All',
        appAcceptFrom: '',
        appAcceptTo: '',
        eduProgFrom: '',
        eduProgTo: '',
        positions: [],
      } as EducationalProgram);
    });
  }

  getStatuses() {
    this.staticService.getCandidateStatus().subscribe((data) => {
      const values: string[] = Object.values(data);
      this.statuses = ['All', ...values];
    });
  }

  onSubmit() {
    if (this.searchForm.valid) {
      const queryArr: string[] = [],
        program = this.searchForm.value.searchEducationalProgram,
        status = this.searchForm.value.searchStatus,
        name = this.searchForm.value.searchName,
        email = this.searchForm.value.searchEmail;

      if (email) {
        queryArr.push(`email=${email}`);
      }
      if (name) {
        queryArr.push(`name=${name}`);
      }
      if (program) {
        queryArr.push(`gguid=${program}`);
      }
      if (status) {
        queryArr.push(`statusid=${status}`);
      }

      const query = queryArr.join('&');

      this.candidatesService.searchCandidate(query).subscribe((data) => {
        console.log('searched candidates: ', data);
        this.searchEvent.emit(data);
      });
    }
  }
}
