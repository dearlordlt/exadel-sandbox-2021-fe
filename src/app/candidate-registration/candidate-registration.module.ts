import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateRegistrationComponent } from './candidate-registration/candidate-registration.component';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';

@NgModule({
  declarations: [CandidateRegistrationComponent, CandidateFormComponent],
  imports: [CommonModule],
})
export class CandidateRegistrationModule {}
