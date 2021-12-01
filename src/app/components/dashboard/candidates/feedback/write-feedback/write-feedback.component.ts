import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../../../service/http/candidate-list/feedback/feedback.service';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { CandidatesService } from '../../../../../service/http/candidate-list/candidates.service';

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.component.html',
  styleUrls: ['./write-feedback.component.scss'],
})
export class WriteFeedbackComponent implements OnInit {
  name = '';
  feedback: any;
  status = '';
  checkStatus = false;

  feedbackForm: FormGroup = new FormGroup({
    feedBackType: new FormControl('Type'),
    feedbackMark: new FormControl(''),
    comment: new FormControl(''),
    datetimeNow: new FormControl('2021-11-30T10:06:14.204Z'),
  });

  constructor(private router: Router, private rwFeedback: FeedbackService, private candidatesService: CandidatesService) {
    this.name = this.rwFeedback.candidateName;
  }

  ngOnInit(): void {
    this.candidatesService.getCandidates().pipe(
      tap(candidates => candidates.map(c => {
        this.status = c.status;
        console.log('status:', c.status);
      })),
    ).subscribe();
  }

  get feedbackMark() {
    return this.feedbackForm.controls['feedbackMark'] as FormControl;
  }

  get comment() {
    return this.feedbackForm.controls['comment'] as FormControl;
  }

  back() {
    this.router.navigateByUrl('/dashboard').then();
  }

  saveFeedback() {
    this.rwFeedback.writeFeedback({
      ...this.feedbackForm.value,
      employeeId: localStorage.getItem('id'),
      candidateId: this.rwFeedback.candidateId,
    }).pipe(tap(feedback => {
      this.feedback = feedback;
      console.log(this.feedback);
    })).subscribe();
  }

}
