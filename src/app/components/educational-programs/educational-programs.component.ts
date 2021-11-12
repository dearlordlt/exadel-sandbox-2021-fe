import { Component, OnInit } from '@angular/core';
import { EducationalProgramsData } from '../../global/educational-programs-data';

@Component({
  selector: 'app-educational-programs',
  templateUrl: './educational-programs.component.html',
  styleUrls: ['./educational-programs.component.scss'],
})
export class EducationalProgramsComponent {
  displayedColumns: string[] = ['name', 'applicationAcceptancePeriod', 'educationalProgramsPeriod', 'edit'];
  dataSource = EducationalProgramsData;

  constructor() {}
}
