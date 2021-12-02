export interface PostEducationalProgram {
  name: string;
  appAcceptFrom: string;
  appAcceptTo: string;
  eduProgFrom: string;
  eduProgTo: string;
  posiForEduPros: Position[];
}

export interface Position {
  id?: string;
  name: string;
  descrAndRequ: string;
}
