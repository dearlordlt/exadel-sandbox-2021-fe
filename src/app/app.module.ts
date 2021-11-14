import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppMaterialModule} from './app-material.module';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CandidateRegistrationModule} from './candidate-registration/candidate-registration.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {TopBarComponent} from './components/shared/top-bar/top-bar.component';
import {SearchCandidateComponent} from './components/dashboard/search-candidate/search-candidate.component';
import {CandidateListComponent} from './components/dashboard/candidate-list/candidate-list.component';
import {PlanningComponent} from './components/planning/planning.component';
import {EducationalProgramsComponent} from './components/educational-programs/educational-programs.component';
import {LettersComponent} from './components/letters/letters.component';
import {SendLetterComponent} from './components/letters/send-letter/send-letter.component';
import {ReportComponent} from './components/report/report.component';
import {CreateEducationalProgramComponent} from './components/educational-programs/create-educational-program/create-educational-program.component';
import {LogoutComponent} from './components/shared/logout/logout.component';
import {LoginComponent} from './login/login.component';
import {CreateLettersTempComponent} from './components/letters/create-letters-temp/create-letters-temp.component';
import {SearchCandidatesComponent} from './components/shared/search-candidates/search-candidates.component';
import {UpdateCandidateDialogComponent} from './components/dashboard/candidate-list/update-candidate-dialog/update-candidate-dialog.component';
import {PlannerComponent} from './components/planning/planner/planner.component';
import {ChartModule} from "angular-highcharts";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopBarComponent,
    SearchCandidateComponent,
    CandidateListComponent,
    PlanningComponent,
    EducationalProgramsComponent,
    LettersComponent,
    ReportComponent,
    CreateEducationalProgramComponent,
    LoginComponent,
    LogoutComponent,
    CreateLettersTempComponent,
    SendLetterComponent,
    SearchCandidatesComponent,
    UpdateCandidateDialogComponent,
    PlannerComponent,
  ],
  imports: [
    AppMaterialModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CandidateRegistrationModule,
    FormsModule,
    ChartModule
  ],
  providers: [],
  entryComponents: [LogoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
