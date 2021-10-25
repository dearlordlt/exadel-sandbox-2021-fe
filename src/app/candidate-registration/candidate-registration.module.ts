import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CandidateHeaderComponent } from './candidate-header/candidate-header.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
@NgModule({
  declarations: [CandidateFormComponent, CandidateHeaderComponent],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule],
})
export class CandidateRegistrationModule {}
