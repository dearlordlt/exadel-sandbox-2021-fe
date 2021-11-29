import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModule } from '../../app-material.module';
import { AppRoutingModule } from '../../app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidateFormComponent } from './candidate-form/candidate-form.component';
import { CandidateHeaderComponent } from './candidate-header/candidate-header.component';
import { CandidateRegistrationComponent } from './candidate-registration.component';

@NgModule({
  declarations: [CandidateFormComponent, CandidateHeaderComponent, CandidateRegistrationComponent],
  imports: [CommonModule, AppRoutingModule,  FormsModule, ReactiveFormsModule, AppMaterialModule, MatSelectCountryModule.forRoot('en'), HttpClientModule],
})
export class CandidateRegistrationModule {}
