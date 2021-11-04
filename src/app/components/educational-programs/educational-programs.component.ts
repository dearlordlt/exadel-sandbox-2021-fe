import { Component, OnInit } from '@angular/core';

export interface EducationalProgram {
  name: string;
  acceptanceFrom: string;
  acceptanceTo: string;
  programFrom: string;
  programTo: string;
}

const ELEMENT_DATA: EducationalProgram[] = [
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
  {
    name: '.NET, JS, BA: 10-12.21',
    acceptanceFrom: '20.09.2021',
    acceptanceTo: '01.10.2021',
    programFrom: '15.10.2021',
    programTo: '12.12.2021',
  },
];

@Component({
  selector: 'app-educational-programs',
  templateUrl: './educational-programs.component.html',
  styleUrls: ['./educational-programs.component.scss'],
})
export class EducationalProgramsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'applicationAcceptancePeriod', 'educationalProgramsPeriod', 'edit'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {}
}
