import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from '../../../../../service/http/candidate-list/feedback/feedback.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { StaticService } from '../../../../../service/http/static/static.service';
import { CandidatesService } from '../../../../../service/http/candidate-list/services/candidates.service';

@Component({
  selector: 'app-write-feedback',
  templateUrl: './write-feedback.component.html',
  styleUrls: ['./write-feedback.component.scss'],
})
export class WriteFeedbackComponent implements OnInit {
  name = '';
  feedback: any;
  checkStatus = '';
  status = 0;
  Skills = [1, 2, 3, 4];
  Marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  feedbackTypeValue = '';
  feedbackForm: FormGroup = new FormGroup({
    datetimeNow: new FormControl('', Validators.required),
    feedBackType: new FormControl('', Validators.required),
    feedbackMark: new FormControl('1', Validators.required),
    comment: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]),
  });
  success = false;

  constructor(
    private router: Router,
    private rwFeedback: FeedbackService,
    private feedbackTypeService: StaticService,
    private candidateService: CandidatesService
  ) {
    this.name = this.rwFeedback.candidateName;
    this.status = this.rwFeedback.candidateStatus;
    console.log();
  }

  get feedbackType() {
    return this.feedbackForm.controls['feedBackType'] as FormControl;
  }

  get feedbackMark() {
    return this.feedbackForm.controls['feedbackMark'] as FormControl;
  }

  get comment() {
    return this.feedbackForm.controls['comment'] as FormControl;
  }

  get datetimeNow() {
    return this.feedbackForm.controls['datetimeNow'] as FormControl;
  }

  ngOnInit(): void {
    this.rwFeedback
      .getEmployeeById(localStorage.getItem('id')!)
      .pipe(
        tap((emp) => {
          this.checkStatus = emp.empPosition;
          this.feedbackTypeService
            .getFeedbackType()
            .pipe(
              tap((type) => {
                if (emp.empPosition == 'Recruiter') {
                  this.feedbackTypeValue = type[1].name;
                } else if (emp.empPosition == 'Mentor') {
                  this.feedbackTypeValue = type[3].name;
                } else if (emp.empPosition == 'Interviewer' && this.status == 5) {
                  this.feedbackTypeValue = type[0].name;
                } else if (emp.empPosition == 'Interviewer' && this.status == 10) {
                  this.feedbackTypeValue = type[2].name;
                }
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  back() {
    this.router.navigateByUrl('/dashboard').then();
  }

  saveFeedback() {
    const date = new Date();
    this.datetimeNow.setValue(date);
    this.feedbackType.setValue(this.feedbackTypeValue);
    if (this.feedbackForm.valid && !this.success) {
      this.rwFeedback
        .writeFeedback({
          ...this.feedbackForm.value,
          employeeId: localStorage.getItem('id'),
          candidateId: this.rwFeedback.candidateId,
        })
        .pipe(
          tap((feedback) => {
            this.feedback = feedback;
            this.success = true;
          })
        )
        .subscribe((r) => {
          this.candidateService
            .getCandidateByID(this.rwFeedback.candidateId)
            .pipe(
              tap((candidate) => {
                this.rwFeedback
                  .getEmployeeById(localStorage.getItem('id')!)
                  .pipe(
                    tap((emp) => {
                      if (emp.empPosition == 'Recruiter' && candidate.softSkillLevel == 0) {
                        this.candidateService.updateCandidate({ ...candidate, softSkillLevel: r.feedbackMark }).subscribe();
                      } else if (emp.empPosition == 'Interviewer' && candidate.statusMark == 5 && candidate.hardSkillLevel == 0) {
                        this.candidateService.updateCandidate({ ...candidate, hardSkillLevel: r.feedbackMark }).subscribe();
                      } else if (emp.empPosition == 'Interviewer' && candidate.statusMark == 10 && candidate.interViewerMark == 0) {
                        this.candidateService.updateCandidate({ ...candidate, interViewerMark: r.feedbackMark }).subscribe();
                      } else if (emp.empPosition == 'Mentor' && candidate.mentorsMark == 0) {
                        this.candidateService.updateCandidate({ ...candidate, mentorsMark: r.feedbackMark }).subscribe();
                      }
                    })
                  )
                  .subscribe();
              })
            )
            .subscribe();
        });
    } else if (this.success) {
      alert("You already have left feedback, can't add more");
    } else {
      alert('Inputs are required');
    }
  }
}
