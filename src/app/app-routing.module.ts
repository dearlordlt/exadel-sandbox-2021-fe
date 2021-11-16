import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EducationalProgramsComponent } from './components/educational-programs/educational-programs.component';
import { CreateEducationalProgramComponent } from './components/educational-programs/create-educational-program/create-educational-program.component';
import { LettersComponent } from './components/letters/letters.component';
import { PlanningComponent } from './components/planning/planning.component';
import { PlannerComponent } from './components/planning/planner/planner.component';
import { ReportComponent } from './components/report/report.component';
import { LoginComponent } from './login/login.component';
import { CreateLettersTempComponent } from './components/letters/create-letters-temp/create-letters-temp.component';
import { SendLetterComponent } from './components/letters/send-letter/send-letter.component';
import { CandidateRegistrationComponent } from './components/candidate-registration/candidate-registration.component';

const routes: Routes = [
  {
    path: '',
    component: CandidateRegistrationComponent,
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
    path: 'planning/:educationalProgramId',
    component: PlannerComponent,
  },
  {
    path: 'create-educational-program',
    component: CreateEducationalProgramComponent,
  },
  {
    path: 'educational-programs',
    component: EducationalProgramsComponent,
  },
  {
    path: 'educational-programs',
    component: EducationalProgramsComponent,
  },
  {
    path: 'send-letter',
    component: SendLetterComponent,
  },
  {
    path: 'letters',
    component: LettersComponent,
  },
  {
    path: 'report',
    component: ReportComponent,
  },
  {
    path: 'create-letters-temp',
    component: CreateLettersTempComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
