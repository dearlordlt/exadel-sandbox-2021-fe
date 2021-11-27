import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StaticService } from 'src/app/service/http/static/static.service';
import { StaticData } from '../../../models/staticData';
import { educationalPrograms } from 'src/app/global/constants';
import { EducationalProgramsService } from 'src/app/service/http/educational-programs/educational-programs.service';
import { EducationalProgram } from '../../shared/interfaces/educational-program/educational-program.interface';

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
  statuses: string[] = ['All'];
  constructor(
    private fb: FormBuilder,
    private staticService: StaticService,
    private educationalProgramsService: EducationalProgramsService
  ) {}

  ngOnInit(): void {
    this.educationalProgramsService.getEducationalPrograms().subscribe((data) => {
      console.log(data);
      data.forEach((program) => {
        this.programsId.push(program.id);
        this.programsName.push(program.name);
      });
    });

    this.staticService.getCandidateStatus().subscribe((data) => {
      const keys: string[] = Object.keys(data);
      for (const key in keys) {
        this.statuses.push(data[keys[key]]);
      }
    });
  }

  clickSearch() {
    // this.searchEvent.emit([
    //   this.searchForm.value.searchEduProgram,
    //   this.searchForm.value.searchStatus,
    //   this.searchForm.value.searchName,
    //   this.searchForm.value.searchEmail,
    // ]);
    console.log([
      this.searchForm.value.searchEduProgram,
      this.searchForm.value.searchStatus,
      this.searchForm.value.searchName,
      this.searchForm.value.searchEmail,
    ]);
  }
}
