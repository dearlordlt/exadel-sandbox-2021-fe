import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FeedbackService} from "../../../../../service/http/candidate-list/feedback/feedback.service";
import {map, tap} from "rxjs/operators";
import {CandidatesService} from "../../../../../service/http/candidate-list/services/candidates.service";

@Component({
  selector: 'app-read-feedback',
  templateUrl: './read-feedback.component.html',
  styleUrls: ['./read-feedback.component.scss']
})
export class ReadFeedbackComponent implements OnInit {
  name = ''
  InterviewerBeforeSandbox = '';
  InterviewerAfterSandbox = ''
  RecruiterName = '';
  MentorName = '';
  feedbackFromRecruiter = '';
  feedbackFromInterViewerBeforeSandbox = '';
  feedbackFromInterViewerAfterSandbox = '';
  feedbackFromMentor = '';

  MarkFromRecruiter = 0;
  MarkFromInterviewerBeforeSandbox = 0;
  MarkFromInterviewerAfterSandbox = 0;
  MarkFromMentor = 0;


  constructor(private router: Router, private readFeedback: FeedbackService, private candidateService: CandidatesService) {
    this.name = this.readFeedback.candidateName
  }

  ngOnInit(): void {
    this.readFeedback.getAllFeedback(this.readFeedback.candidateId).pipe(tap(feedback => {
      feedback.map((f: any) => {
        if (f.employee.empPosition == 'Recruiter') {
          this.RecruiterName = f.employee.empPosition + ' ' + f.employee.firstname + ' ' + f.employee.lastname
          this.feedbackFromRecruiter = f.comment;
          this.MarkFromRecruiter = f.feedbackMark;

        } else if (f.employee.empPosition == 'Mentor') {
          this.MentorName = f.employee.empPosition + ' ' + f.employee.firstname + ' ' + f.employee.lastname;
          this.feedbackFromMentor = f.comment;
          this.MarkFromMentor = f.feedbackMark;

        } else if (f.employee.empPosition == 'Interviewer') {
          if (f.feedBackType == 'InterViewerMark') {
            this.InterviewerAfterSandbox = f.employee.empPosition + ' ' + f.employee.firstname + ' ' + f.employee.lastname;
            this.feedbackFromInterViewerAfterSandbox = f.comment
            this.MarkFromInterviewerAfterSandbox = f.feedbackMark;

          } else {
            this.InterviewerBeforeSandbox = f.employee.empPosition + ' ' + f.employee.firstname + ' ' + f.employee.lastname;
            this.feedbackFromInterViewerBeforeSandbox = f.comment
            this.MarkFromInterviewerBeforeSandbox = f.feedbackMark;

          }
        }
      })

    })).subscribe()

  }

  back() {
    this.router.navigateByUrl('/dashboard').then()
  }


}
