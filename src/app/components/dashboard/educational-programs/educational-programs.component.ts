import { Component, OnInit } from '@angular/core';
import { EducationalProgramsService } from '../../../service/http/educational-programs/educational-programs.service';
import { EducationalProgram } from '../../shared/interfaces/educational-program/educational-program.interface';
import * as moment from 'moment';
import 'moment-timezone';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-educational-programs',
  templateUrl: './educational-programs.component.html',
  styleUrls: ['./educational-programs.component.scss'],
})
export class EducationalProgramsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'applicationAcceptancePeriod', 'educationalProgramsPeriod', 'edit'];
  dataSource: EducationalProgram[] = [];

  accepPerFrom: FormControl = new FormControl();
  progPerFrom: FormControl = new FormControl();
  eduProgramName: FormControl = new FormControl();

  constructor(private educationalProgramsService: EducationalProgramsService) {
  }

  ngOnInit(): void {
    this.fetchEducationalPrograms();
  }

  fetchEducationalPrograms(): void {
    this.educationalProgramsService
      .getEducationalPrograms(this.accepPerFrom.value, this.progPerFrom.value, this.eduProgramName.value)
      .subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)));
  }

  trimTimeFromDate(educationalPrograms: EducationalProgram[]): EducationalProgram[] {
    // Trim the time part from date and replaces dashes with dots
    educationalPrograms.forEach((educationalProgram) => {
      educationalProgram.appAcceptFrom = moment(educationalProgram.appAcceptFrom).format(moment.HTML5_FMT.DATE).split('-').join('.');
      educationalProgram.appAcceptTo = moment(educationalProgram.appAcceptTo).format(moment.HTML5_FMT.DATE).split('-').join('.');
      educationalProgram.eduProgFrom = moment(educationalProgram.eduProgFrom).format(moment.HTML5_FMT.DATE).split('-').join('.');
      educationalProgram.eduProgTo = moment(educationalProgram.eduProgTo).format(moment.HTML5_FMT.DATE).split('-').join('.');
    });
    return educationalPrograms;
  }
}
