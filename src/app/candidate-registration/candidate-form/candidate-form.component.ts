import { Component, OnInit } from '@angular/core';


interface Program {
  value: string;
  viewValue: string;
}
interface Technology{
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
    {value: '.Net-0', viewValue: '.Net'},
    {value: 'JS-1', viewValue: 'JS'},
    {value: 'BA-2', viewValue: 'BS'}
  ];
  technologies: Technology[] = [
    {value: '.Net-0', viewValue: '.Net'},
    {value: 'JS-1', viewValue: 'JS'},
    {value: 'BA-2', viewValue: 'BS'}
  ]
  constructor() {}

  ngOnInit(): void {}
}
