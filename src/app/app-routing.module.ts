import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { CandidateHeaderComponent } from './candidate-registration/candidate-header/candidate-header.component';

// const routes: Routes = [{ path: 'candidate-registration', component: CandidateHeaderComponent }];
const routes: Routes = [];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
