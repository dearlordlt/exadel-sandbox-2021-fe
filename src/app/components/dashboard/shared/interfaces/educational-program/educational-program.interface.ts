import { Position } from './position.interface';

export interface EducationalProgram {
  id: string;
  name: string;
  appAcceptFrom: string;
  appAcceptTo: string;
  eduProgFrom: string;
  eduProgTo: string;
  positions: Position[];
}
