import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EducationalProgramsComponent } from './components/dashboard/educational-programs/educational-programs.component';
import { CreateEducationalProgramComponent } from './components/dashboard/educational-programs/create-educational-program/create-educational-program.component';
import { LettersComponent } from './components/dashboard/letters/letters.component';
import { PlanningComponent } from './components/dashboard/planning/planning.component';
import { PlannerComponent } from './components/dashboard/planning/planner/planner.component';
import { ReportComponent } from './components/dashboard/report/report.component';
import { LoginComponent } from './components/login/login.component';
import { CreateLettersTempComponent } from './components/dashboard/letters/create-letters-temp/create-letters-temp.component';
import { SendLetterComponent } from './components/dashboard/letters/send-letter/send-letter.component';
import { ReadFeedbackComponent } from './components/dashboard/candidates/feedback/read-feedback/read-feedback.component';
import { WriteFeedbackComponent } from './components/dashboard/candidates/feedback/write-feedback/write-feedback.component';
import { CandidateRegistrationComponent } from './components/candidate-registration/candidate-registration.component';
import { AuthGuard } from './guards/auth.guard';
import { CandidatesComponent } from './components/dashboard/candidates/candidates.component';

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
    canActivate: [AuthGuard],
    children: [
      { path: 'candidates', component: CandidatesComponent },
      { path: '', redirectTo: 'candidates', pathMatch: 'full' },
      {
        path: 'write_feedback',
        component: WriteFeedbackComponent,
      },
      {
        path: 'read_feedback',
        component: ReadFeedbackComponent,
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
