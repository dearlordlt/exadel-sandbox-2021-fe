import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-educational-program',
  templateUrl: './educational-program.component.html',
  styleUrls: ['./educational-program.component.scss']
})
export class EducationalProgramComponent implements OnInit {
  programs = ['All', '.NET', 'JS', 'BA']

  constructor() {
  }

  ngOnInit(): void {
  }

}
