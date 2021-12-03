import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FeedbackService} from '../../../../../service/http/candidate-list/feedback/feedback.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {StaticService} from "../../../../../service/http/static/static.service";

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
  Skills = [1, 2, 3, 4]
  Marks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  feedbackTypeValue = '';
  feedbackForm: FormGroup = new FormGroup({
    datetimeNow: new FormControl('', Validators.required),
    feedBackType: new FormControl('', Validators.required),
    feedbackMark: new FormControl('1', Validators.required),
    comment: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]),
  });
  success = false;
  constructor(private router: Router, private rwFeedback: FeedbackService, private feedbackTypeService: StaticService) {
    this.name = this.rwFeedback.candidateName;
    this.status = this.rwFeedback.candidateStatus
    console.log()
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

    this.rwFeedback.getEmployeeById(localStorage.getItem('id')!).pipe(tap(emp => {
      this.checkStatus = emp.role.roleName
      this.feedbackTypeService.getFeedbackType().pipe(tap(type => {
          if (emp.role.roleName == 'Recruiter') {
            this.feedbackTypeValue = type[1].name
          } else if (emp.role.roleName == 'Mentor') {
            this.feedbackTypeValue = type[3].name
          } else if (emp.role.roleName == 'Interviewer' && this.status == 5) {
            this.feedbackTypeValue = type[0].name
          } else if (emp.role.roleName == 'Interviewer' && this.status == 10) {
            this.feedbackTypeValue = type[2].name
          }
        }
      )).subscribe()
    })).subscribe()

  }

  back() {
    this.router.navigateByUrl('/dashboard').then();
  }

  saveFeedback() {
    const date = new Date();
    this.datetimeNow.setValue(date);
    this.feedbackType.setValue(this.feedbackTypeValue)
    if(this.feedbackForm.valid) {
      this.rwFeedback.writeFeedback({
        ...this.feedbackForm.value,
        employeeId: localStorage.getItem('id'),
        candidateId: this.rwFeedback.candidateId,
      }).pipe(tap(feedback => {
        this.feedback = feedback;
        this.success = true;
        console.log(this.feedback);
      })).subscribe();
    }else {
      alert('Inputs are required')
    }
  }

}
