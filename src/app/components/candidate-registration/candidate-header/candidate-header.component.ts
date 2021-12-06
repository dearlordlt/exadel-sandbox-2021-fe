import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-candidate-header',
  templateUrl: './candidate-header.component.html',
  styleUrls: ['./candidate-header.component.scss'],
})
export class CandidateHeaderComponent implements OnInit {
  @Output() register = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  scrollToCandidateRegistrationPart(id: string) {
    this.register.emit();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }
}
