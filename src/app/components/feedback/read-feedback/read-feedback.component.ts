import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReadFeedbackService} from "./read-feedback.service";

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
