import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RouterModule} from "@angular/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {TopBarComponent} from './components/shared/top-bar/top-bar.component';
import {EducationalProgramComponent} from './components/dashboard/educational-program/educational-program.component';
import {SearchCandidateComponent} from './components/dashboard/search-candidate/search-candidate.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CandidateListComponent} from './components/dashboard/candidate-list/candidate-list.component';
import {HttpClientModule} from "@angular/common/http";
import {PlanningComponent} from './components/planning/planning.component';
import {EducationalProgramsComponent} from './components/educational-programs/educational-programs.component';
import {LettersComponent} from './components/letters/letters.component';
import {ReportComponent} from './components/report/report.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, TopBarComponent, EducationalProgramComponent, SearchCandidateComponent, CandidateListComponent, PlanningComponent, EducationalProgramsComponent, LettersComponent, ReportComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot([{
    path: '',
    component: TopBarComponent,
    pathMatch: 'full'
  },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'planning',
      component: PlanningComponent
    },
    {
      path: 'educational_programs',
      component: EducationalProgramsComponent
    },
    {
      path: 'letters',
      component: LettersComponent
    },
    {
      path: 'report',
      component: ReportComponent
    },
  ])],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
