import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.component.html',
  styleUrls: ['./write-feedback.component.scss']
})
export class WriteFeedbackComponent implements OnInit {
  name = 'Aliaksandr Katzuba'

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl('/dashboard').then()
  }

  saveFeedback() {
    console.log('feedback saved')
  }

}
