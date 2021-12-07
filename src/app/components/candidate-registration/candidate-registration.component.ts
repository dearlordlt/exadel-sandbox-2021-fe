import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-registration',
  templateUrl: './candidate-registration.component.html',
  styleUrls: ['./candidate-registration.component.scss'],
})
export class CandidateRegistrationComponent implements OnInit {
  programs = false;
  constructor() {}

  ngOnInit(): void {}

  showPrograms() {
    this.programs = true;
  }
}
