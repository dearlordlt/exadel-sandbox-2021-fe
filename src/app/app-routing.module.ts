import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CandidateRegistrationComponent } from './candidate-registration/candidate-registration/candidate-registration.component';

const routes: Routes = [{ path: 'candidate-registration', component: CandidateRegistrationComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
