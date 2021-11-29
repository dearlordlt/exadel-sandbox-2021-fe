import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../../../service/http/candidate-list/feedback/feedback.service';

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.component.html',
  styleUrls: ['./write-feedback.component.scss'],
})
export class WriteFeedbackComponent implements OnInit {
  name = 'Aliaksandr Katzuba';

  // feedback

  constructor(private router: Router, private rwFeedback: FeedbackService) {
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigateByUrl('/dashboard').then();
  }

  saveFeedback() {

  }

}
