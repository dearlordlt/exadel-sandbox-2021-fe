export interface CreateFeedback {
  datetimeNow: string;
  feedBackType: string;
  feedbackMark: number;
  comment: string;
  employeeId: string;
  candidateId: string;
}

export interface Feedback {
  id: string;
  datetimeNow: string;
  feedBackType: string;
  feedbackMark: number;
  comment: string;
  employeeId: string;
  candidateId: string;
}
