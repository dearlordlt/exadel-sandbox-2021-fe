import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FeedbackService} from "../../../../../service/http/candidate-list/feedback/feedback.service";
import {tap} from "rxjs/operators";
import {CandidatesService} from "../../../../../service/http/candidate-list/services/candidates.service";

@Component({
  selector: 'app-read-feedback',
  templateUrl: './read-feedback.component.html',
  styleUrls: ['./read-feedback.component.scss']
})
export class ReadFeedbackComponent implements OnInit {
  name = ''
  InterviewerName = '';
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
    this.readFeedback.getAllFeedback().pipe(tap(candidate =>
      candidate.map((c: any) => {
          this.candidateService.getCandidatesByID(c.candidateId).pipe(tap(cand => {
            this.readFeedback.getEmployeeById(c.employeeId).pipe(tap(employee => {
                if (employee.role.roleName == 'Recruiter') {
                  this.feedbackFromRecruiter = c.comment;
                  this.MarkFromRecruiter = c.feedbackMark;
                  this.RecruiterName = employee.role.roleName + ' ' + employee.firstname + ' ' + employee.lastname;

                }
                else if(employee.role.roleName=='Interviewer' && c.feedBackType == 'InterViewerMark'){
                  this.MarkFromInterviewerAfterSandbox = c.feedbackMark
                  this.feedbackFromInterViewerAfterSandbox = c.comment;
                  this.InterviewerName = employee.role.roleName + ' ' + employee.firstname + ' ' + employee.lastname;
                }
                else if (employee.role.roleName == 'Interviewer') {
                  this.feedbackFromInterViewerBeforeSandbox = c.comment;
                  this.MarkFromInterviewerBeforeSandbox = c.feedbackMark
                  this.InterviewerName = employee.role.roleName + ' ' + employee.firstname + ' ' + employee.lastname;
                }

                else if (employee.role.roleName == 'Mentor') {
                  this.feedbackFromMentor = c.comment;
                  this.MarkFromMentor = c.feedbackMark
                  this.MentorName = employee.role.roleName + ' ' + employee.firstname + ' ' + employee.lastname;
                }
              }
            )).subscribe()
          })).subscribe()
        }
      )
    )).subscribe()

  }

  back() {
    this.router.navigateByUrl('/dashboard').then()
  }


}
