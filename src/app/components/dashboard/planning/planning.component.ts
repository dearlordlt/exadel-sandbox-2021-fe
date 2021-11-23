import { Component, OnInit } from '@angular/core';
import { EducationalProgramsService } from '../../service/http/educational-programs/educational-programs.service';
import { EducationalProgram } from '../shared/interfaces/educational-program/educational-program.interface';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  displayedColumns: string[] = ['name', 'applicationAcceptancePeriod', 'educationalProgramsPeriod', 'calendar'];
  dataSource: EducationalProgram[] = [];

  constructor(private educationalProgramsService: EducationalProgramsService) {}

  ngOnInit(): void {
    this.fetchEducationalPrograms();
  }

  fetchEducationalPrograms(): void {
    this.educationalProgramsService
      .getEducationalPrograms()
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
