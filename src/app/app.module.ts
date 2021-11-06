import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppMaterialModule } from './app-material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateRegistrationModule } from './candidate-registration/candidate-registration.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopBarComponent } from './components/shared/top-bar/top-bar.component';
import { EducationalProgramComponent } from './components/dashboard/educational-program/educational-program.component';
import { SearchCandidateComponent } from './components/dashboard/search-candidate/search-candidate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidateListComponent } from './components/dashboard/candidate-list/candidate-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanningComponent } from './components/planning/planning.component';
import { EducationalProgramsComponent } from './components/educational-programs/educational-programs.component';
import { LettersComponent } from './components/letters/letters.component';
import { ReportComponent } from './components/report/report.component';


import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


import { CreateEducationalProgramComponent } from './components/educational-programs/create-educational-program/create-educational-program.component';

import { LogoutComponent } from './components/shared/logout/logout.component';
import { MatDialogModule } from '@angular/material/dialog';

import { LoginComponent } from './login/login.component';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateLettersTempComponent } from './components/letters/create-letters-temp/create-letters-temp.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopBarComponent,
    EducationalProgramComponent,
    SearchCandidateComponent,
    CandidateListComponent,
    PlanningComponent,
    EducationalProgramsComponent,
    LettersComponent,
    ReportComponent,


    LoginFormComponent,
    MatFormFieldModule,

    CreateEducationalProgramComponent,
    LoginComponent,
    LogoutComponent,
    CreateLettersTempComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CandidateRegistrationModule,
    RouterModule,
    MatDialogModule,

    RouterModule.forRoot([
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
      {
        path: 'login',
        component: LoginFormComponent,
      },
    ]),
    LogoutComponent,

    MatCardModule,

    MatToolbarModule,
    MatTableModule,
    MatSortModule,

  ],
 
  providers: [],
  entryComponents:[LogoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
