import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRegistrationComponent } from './candidate-registration/candidate-registration.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { EducationalProgramsComponent } from './educational-programs/educational-programs.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [CandidateRegistrationComponent, CandidateFormComponent, EducationalProgramsComponent],
  imports: [CommonModule, MatButtonModule, MatCardModule],
})
export class CandidateRegistrationModule {}
