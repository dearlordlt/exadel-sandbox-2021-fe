import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopBarComponent } from './components/shared/top-bar/top-bar.component';
import { EducationalProgramComponent } from './components/dashboard/educational-program/educational-program.component';
import { SearchCandidateComponent } from './components/dashboard/search-candidate/search-candidate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CandidateListComponent } from './components/dashboard/candidate-list/candidate-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PlanningComponent } from './components/planning/planning.component';
import { EducationalProgramsComponent } from './components/educational-programs/educational-programs.component';
import { LettersComponent } from './components/letters/letters.component';
import { ReportComponent } from './components/report/report.component';

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
  ],
  imports: [
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
    ]),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
