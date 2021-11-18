import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {EducationalProgramsComponent} from './components/educational-programs/educational-programs.component';
import {CreateEducationalProgramComponent} from './components/educational-programs/create-educational-program/create-educational-program.component';
import {LettersComponent} from './components/letters/letters.component';
import {PlanningComponent} from './components/planning/planning.component';
import {PlannerComponent} from './components/planning/planner/planner.component';
import {ReportComponent} from './components/report/report.component';
import {LoginComponent} from './login/login.component';
import {CreateLettersTempComponent} from './components/letters/create-letters-temp/create-letters-temp.component';
import {SendLetterComponent} from './components/letters/send-letter/send-letter.component';
import {ReadFeedbackComponent} from "./components/feedback/read-feedback/read-feedback.component";
import {WriteFeedbackComponent} from "./components/feedback/write-feedback/write-feedback.component";
import { CandidateRegistrationComponent } from './components/candidate-registration/candidate-registration.component';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard]
  },
  {
    path: 'write_feedback',
    component: WriteFeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'read_feedback',
    component: ReadFeedbackComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'planning',
    component: PlanningComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'planning/:educationalProgramId',
    component: PlannerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-educational-program',
    component: CreateEducationalProgramComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'educational-programs',
    component: EducationalProgramsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'educational-programs',
    component: EducationalProgramsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'send-letter',
    component: SendLetterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'letters',
    component: LettersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-letters-temp',
    component: CreateLettersTempComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
