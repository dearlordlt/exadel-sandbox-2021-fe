export interface CreateFeedback {
  datetimeNow: string;
  feedbackMark: number;
  comment: string;
  employeeId: string;
  candidateId: string;
}

export interface Feedback {
  candidateId: 1;
  fromRecruiter: string;
  fromInterviewer: string;
  fromMentor: string;
  fromInterviewerTwo: string;
}
