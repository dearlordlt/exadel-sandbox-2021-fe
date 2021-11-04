import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  name = 'Aliaksandr Katzuba'

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl('/dashboard').then()
  }
}
