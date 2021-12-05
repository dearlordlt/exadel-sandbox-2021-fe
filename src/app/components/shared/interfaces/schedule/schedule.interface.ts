export interface Schedule {
  id: string
  myDateTime: string
  educationProgramId: string
  employeeId: string
  events: Event[]
}

export interface Event {
  id: string
  description: string
  interviewScheduleId: string
  candidateId: string
}
