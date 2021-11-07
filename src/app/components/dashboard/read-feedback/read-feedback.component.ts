import {Component, OnInit} from '@angular/core';
import {ReadFeedbackService} from "./read-feedback.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-read-feedback',
  templateUrl: './read-feedback.component.html',
  styleUrls: ['./read-feedback.component.scss']
})
export class ReadFeedbackComponent implements OnInit {
  feedback$ = this.readFeedbackService.getFeedback();

  constructor(private router: Router, private readFeedbackService: ReadFeedbackService) {
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl('/dashboard').then()
  }
}
