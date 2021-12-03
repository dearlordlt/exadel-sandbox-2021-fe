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
    this.readFeedback.getAllFeedback().pipe(map(feedback=>{
      feedback.map((f:any)=>{
        if(f.candidateId==this.readFeedback.candidateId) {
          if(f.employee.empPosition=='Recruiter'){
            this.RecruiterName=f.employee.empPosition+' ' + f.employee.firstname+' '+f.employee.lastname
            console.log( this.RecruiterName);
            f.employee.feedbacks.map((fb:any)=>{
              this.feedbackFromRecruiter = fb.comment;
            })
          }else if(f.employee.empPosition=='Mentor'){
            this.MentorName =f.employee.empPosition+' ' +  f.employee.firstname+' '+f.employee.lastname;
            f.employee.feedbacks.map((fb:any)=>{
              this.feedbackFromMentor = fb.comment;
            })
            console.log( this.MentorName);
          }else if(f.employee.empPosition=='Interviewer'){
            f.employee.feedbacks.map((fb:any)=>{
              console.log(fb.feedBackType)
              if(fb.feedBackType == 'InterViewerMark'){
                this.InterviewerAfterSandbox = f.employee.empPosition+' ' + f.employee.firstname+' '+f.employee.lastname;
                this.feedbackFromInterViewerAfterSandbox = fb.comment
              }else{
                this.InterviewerBeforeSandbox =f.employee.empPosition+' ' +  f.employee.firstname+' '+f.employee.lastname;
                this.feedbackFromInterViewerBeforeSandbox = fb.comment
              }
            })
          }
          console.log(f.employee)



        }
      })

    })).subscribe()

  }

  back() {
    this.router.navigateByUrl('/dashboard').then()
  }


}
