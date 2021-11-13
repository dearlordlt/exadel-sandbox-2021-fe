import { Component, OnInit } from '@angular/core';
import { EducationalProgram } from '../shared/interfaces/educational-program.interface';
import { EducationalProgramsData } from '../../global/educational-programs-data';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent {
  displayedColumns: string[] = ['name', 'applicationAcceptancePeriod', 'educationalProgramsPeriod', 'calendar'];
  dataSource = EducationalProgramsData;

  constructor() {}
}
