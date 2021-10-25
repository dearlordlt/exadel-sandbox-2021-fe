import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CandidateHeaderComponent } from './candidate-header/candidate-header.component';

@NgModule({
  declarations: [CandidateFormComponent, CandidateHeaderComponent],
  imports: [CommonModule, MatButtonModule, MatCardModule],
})
export class CandidateRegistrationModule {}
