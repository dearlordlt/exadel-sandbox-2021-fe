export interface EducationalProgram {
  id?: string;
  name: string;
  appAcceptFrom: string;
  appAcceptTo: string;
  eduProgFrom: string;
  eduProgTo: string;
  positions: Position[];
}

export interface Position {
  id?: string;
  name: string;
  descrAndRequ: string;
}
