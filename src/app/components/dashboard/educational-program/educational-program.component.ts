import {Component, OnInit} from '@angular/core';
import {educationalPrograms} from "../../../global/constants";

@Component({
  selector: 'app-educational-program',
  templateUrl: './educational-program.component.html',
  styleUrls: ['./educational-program.component.scss']
})
export class EducationalProgramComponent implements OnInit {
  programs = educationalPrograms

  constructor() {
  }

  ngOnInit(): void {
  }

}
