export interface Candidate {
  id: number;
  firstname: string;
  lastname: string;
  eduProg: string;
  position: string;
  email: string;
  skype?: string;
  phone_number?: string;
  country?: string;
  city?: string;
  english_level: string;
  contact_time: string;
  plan_to_join: string;
  date_of_apply: string;
  status: string;
  soft_skill?: number;
  hard_skill?: number;
  mentor_mark?: number;
  interviewer_mark?: number;
}
