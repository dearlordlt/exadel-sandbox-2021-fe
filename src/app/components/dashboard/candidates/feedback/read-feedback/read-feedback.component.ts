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


  constructor(private router: Router, private readFeedback: FeedbackService) {
    this.name = this.readFeedback.candidateName
  }

  ngOnInit(): void {
    this.readFeedback.getAllFeedback(this.readFeedback.candidateId).pipe(tap(feedback => {
      feedback.map((f: any) => {
        this.readFeedback.getEmployeeById(f.employeeId).pipe(tap(employee => {
          if (employee.empPosition == 'Recruiter') {
            this.RecruiterName = employee.empPosition + ' ' + employee.firstname + ' ' + employee.lastname
            this.feedbackFromRecruiter = f.comment;
            this.MarkFromRecruiter = f.feedbackMark;

          } else if (employee.empPosition == 'Mentor') {
            this.MentorName = employee.empPosition + ' ' + employee.firstname + ' ' + employee.lastname;
            this.feedbackFromMentor = f.comment;
            this.MarkFromMentor = f.feedbackMark;

          } else if (employee.empPosition == 'Interviewer') {
            if (f.feedBackType == 'InterViewerMark') {
              this.InterviewerAfterSandbox = employee.empPosition + ' ' + employee.firstname + ' ' + employee.lastname;
              this.feedbackFromInterViewerAfterSandbox = f.comment
              this.MarkFromInterviewerAfterSandbox = f.feedbackMark;

            } else {
              this.InterviewerBeforeSandbox = employee.empPosition + ' ' + employee.firstname + ' ' + employee.lastname;
              this.feedbackFromInterViewerBeforeSandbox = f.comment
              this.MarkFromInterviewerBeforeSandbox = f.feedbackMark;
            }
          }
        })).subscribe()

      })

    })).subscribe()
  }

  back() {
    this.router.navigateByUrl('/dashboard').then()
  }


}
