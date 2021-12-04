import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducationalProgram } from '../../../shared/interfaces/educational-program/educational-program.interface';
import { EducationalProgramsService } from '../../../../service/http/educational-programs/educational-programs.service';

import * as moment from 'moment';
import 'moment-timezone';
import { dateFormat } from 'highcharts';
@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  programForm: FormGroup = this.fb.group({
    date: '',
  });
  date: string = '';
  dateFomatted: string = '';
  educationalProgramId: string = '';
  educationalProgram: EducationalProgram = {} as EducationalProgram;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private educationalProgramsService: EducationalProgramsService) {}

  ngOnInit(): void {
    this.educationalProgramId = this.route.snapshot.paramMap.get('educationalProgramId')!;
    if (this.educationalProgramId) this.getEducationalProgram();
  }

  getEducationalProgram() {
    this.educationalProgramsService
      .getEducationalProgram(this.educationalProgramId)
      .subscribe((data: EducationalProgram) => (this.educationalProgram = data));
  }
  getDate(){
    
    this.dateFomatted = moment(this.programForm.controls['date'].value).format(moment.HTML5_FMT.DATE).split('-').join('-');

    console.log(this.date)
    console.log(this.dateFomatted)
    return this.dateFomatted;
  }
}
