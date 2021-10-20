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
  other?: string;
  dateOfApplying?: string;
}
