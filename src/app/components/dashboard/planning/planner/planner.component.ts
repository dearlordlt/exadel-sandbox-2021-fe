import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducationalProgram } from '../../../shared/interfaces/educational-program/educational-program.interface';
import { EducationalProgramsService } from '../../../../service/http/educational-programs/educational-programs.service';
import { ScheduleService } from 'src/app/service/http/schedule/schedule.service';
import { Schedule } from 'src/app/components/shared/interfaces/schedule/schedule.interface';
import { Employee } from 'src/app/components/shared/interfaces/schedule/employee.interface';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  programForm: FormGroup = this.fb.group({
    date: '',
  });

  educationalProgramId: string = '';
  educationalProgram: EducationalProgram = {} as EducationalProgram;
  schedule: Schedule[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private educationalProgramsService: EducationalProgramsService,
    private scheduleService: ScheduleService
  ) {}

  ngOnInit(): void {
    this.educationalProgramId = this.route.snapshot.paramMap.get('educationalProgramId')!;
    if (this.educationalProgramId) this.getEducationalProgram();
    //this.getInterviewSchedule();
  }

  getEducationalProgram() {
    this.educationalProgramsService
      .getEducationalProgram(this.educationalProgramId)
      .subscribe((data: EducationalProgram) => (this.educationalProgram = data));
  }

  action() {
    const dateWithoutTime = moment(this.programForm.controls['date'].value).format(moment.HTML5_FMT.DATE);
    console.log('dateWithoutTime: ', dateWithoutTime);
    this.scheduleService
      .getSchedule(this.educationalProgramId, dateWithoutTime)
      .subscribe((data: Schedule[]) => console.log('Schedule: ', data));

    this.scheduleService.getEmployees().subscribe((data: Employee[]) => console.log('Employees: ', data));
  }

  getDate() {
    //moment(this.programForm.controls['date'].value).format(moment.HTML5_FMT.DATE).split('-').join('-');
  }

  getInterviewSchedule() {
    //console.log(this.scheduleService.getSchedule().subscribe((data: Schedule[]) => (this.schedule = data)))
  }
}
