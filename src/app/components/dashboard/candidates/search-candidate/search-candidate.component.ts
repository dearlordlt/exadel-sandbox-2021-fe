import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StaticService } from 'src/app/service/http/static/static.service';
import { StaticData } from '../../../models/staticData';
import { educationalPrograms } from 'src/app/global/constants';
import { EducationalProgramsService } from 'src/app/service/http/educational-programs/educational-programs.service';
import { EducationalProgram } from 'src/app/components/shared/interfaces/educational-program/educational-program.interface';
import { CandidatesService } from '../services/candidates.service';

@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.scss'],
})
export class SearchCandidateComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    searchEduProgram: '',
    searchStatus: '',
    searchName: '',
    searchEmail: '',
  });
  @Output() searchEvent = new EventEmitter();

  programsId: string[] = ['0'];
  programsName: string[] = ['All'];
  statuses: string[] = [];
  constructor(
    private fb: FormBuilder,
    private staticService: StaticService,
    private educationalProgramsService: EducationalProgramsService,
    private candidatesService: CandidatesService
  ) {}
  ngOnInit(): void {
    this.getPrograms();
    this.getStatuses();
  }

  getPrograms() {
    this.educationalProgramsService.getEducationalPrograms().subscribe((data) => {
      console.log(data);
      data.forEach((program) => {
        this.programsId.push(program.id);
        this.programsName.push(program.name);
      });
    });
  }

  getStatuses() {
    this.staticService.getCandidateStatus().subscribe((data) => {
      const values: string[] = Object.values(data);
      this.statuses = ['All', ...values];
    });
  }

  clickSearch() {
    const queryArr: string[] = [],
      program = this.searchForm.value.searchEduProgram,
      status = this.searchForm.value.searchStatus,
      name = this.searchForm.value.searchName,
      email = this.searchForm.value.searchEmail;

    if (email) {
      queryArr.push(`email=${email}`);
    }
    if (name) {
      queryArr.push(`name=${name}`);
    }
    if (program && program !== '0') {
      queryArr.push(`gguid=${program}`);
    }
    if (status) {
      queryArr.push(`statusid=${status}`);
    }

    const query = queryArr.join('&');

    this.candidatesService.searchCandidate(query).subscribe((data) => {
      this.searchEvent.emit(data);
    });
  }
}
