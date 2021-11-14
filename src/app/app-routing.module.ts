import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EducationalProgramsComponent } from './components/educational-programs/educational-programs.component';
import { CreateEducationalProgramComponent } from './components/educational-programs/create-educational-program/create-educational-program.component';
import { LettersComponent } from './components/letters/letters.component';
import { PlanningComponent } from './components/planning/planning.component';
import { ReportComponent } from './components/report/report.component';
import { CandidateHeaderComponent } from './candidate-registration/candidate-header/candidate-header.component';
import { LoginComponent } from './login/login.component';
import { CreateLettersTempComponent } from './components/letters/create-letters-temp/create-letters-temp.component';
import { AuthGuard } from './guards/auth.guard';

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
    //canActivate: [AuthGuard]
  },
  {
    path: 'planning',
    component: PlanningComponent,
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
export class AppRoutingModule {}
