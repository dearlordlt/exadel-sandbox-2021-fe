import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidate-header',
  templateUrl: './candidate-header.component.html',
  styleUrls: ['./candidate-header.component.scss'],
})
export class CandidateHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  scrollToCandidateRegistrationPart(id: string) {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  }
}
