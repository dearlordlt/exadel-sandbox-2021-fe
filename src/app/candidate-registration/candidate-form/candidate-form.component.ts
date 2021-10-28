import { Component, OnInit } from '@angular/core';
import {Country} from '@angular-material-extensions/select-country'; 

  

interface Program {
  value: string;
  viewValue: string;
}
interface Technology{
  value: string;
  viewValue: string;
}
interface Level {
  value: string;
  viewValue: string;
}
interface Time {
  value: string;
  viewValue: string;
}
interface Decision {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})

export class CandidateFormComponent implements OnInit {
  programs: Program[] = [
    {value: '.Net, JS, BA; 10-11.21', viewValue: '.Net, JS, BA; 10-11.21'},
    {value: '.Net, JS, BA; 10-11.21', viewValue: '.Net, JS, BA; 10-11.22'},
    {value: '.Net, JS, BA; 10-11.21', viewValue: '.Net, JS, BA; 10-11.23'}
  ];
  technologies: Technology[] = [
    {value: '.Net-0', viewValue: '.Net'},
    {value: 'JS-1', viewValue: 'JS'},
    {value: 'BA-2', viewValue: 'BS'}
  ];
  levels: Level[] = [
    {value: 'Elementary', viewValue: 'Elementary'},
    {value: 'Pre-Intermediate', viewValue: 'Pre-Intermediate'},
    {value: 'Intermediate', viewValue: 'Intermediate'},
    {value: 'Upper-Intermediate', viewValue: 'Upper-Intermediate'},
    {value: 'Advanced', viewValue: 'Advanced'},
  ];
  times: Time[] = [
    {value: '10.00-13.00', viewValue: '10.00-13.00'},
    {value: '13.00-16.00', viewValue: '13.00-16.00'},
    {value: '16.00-19.00', viewValue: '16.00-19.00'}
  ];
  decisions: Decision[] = [
    {value: 'Yes', viewValue: 'Yes'},
    {value: 'No', viewValue: 'No'},
    {value: 'Maybe', viewValue: 'Maybe'}
  ];
  

  onCountrySelected(country: Country) {
    console.log(country);
  }
  constructor() {}

  ngOnInit(): void {}
}
