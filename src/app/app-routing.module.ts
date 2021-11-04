import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EducationalProgramsComponent } from './components/educational-programs/educational-programs.component';
import { LettersComponent } from './components/letters/letters.component';
import { PlanningComponent } from './components/planning/planning.component';
import { ReportComponent } from './components/report/report.component';
import { CandidateHeaderComponent } from './candidate-registration/candidate-header/candidate-header.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateHeaderComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'planning',
    component: PlanningComponent,
  },
  {
    path: 'educational_programs',
    component: EducationalProgramsComponent,
  },
  {
    path: 'letters',
    component: LettersComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
