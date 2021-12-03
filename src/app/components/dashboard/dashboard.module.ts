import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppMaterialModule } from 'src/app/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

import { CandidatesComponent } from './candidates/candidates.component';
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';
import { WriteFeedbackComponent } from './candidates/feedback/write-feedback/write-feedback.component';
import { ReadFeedbackComponent } from './candidates/feedback/read-feedback/read-feedback.component';
import { SearchCandidateComponent } from './candidates/search-candidate/search-candidate.component';
import { CandidateListComponent } from './candidates/candidate-list/candidate-list.component';
import { PlanningComponent } from './planning/planning.component';
import { EducationalProgramsComponent } from './educational-programs/educational-programs.component';
import { LettersComponent } from './letters/letters.component';
import { ReportComponent } from './report/report.component';
import { CreateEducationalProgramComponent } from './educational-programs/create-educational-program/create-educational-program.component';
import { CreateLettersTempComponent } from './letters/create-letters-temp/create-letters-temp.component';
import { SendLetterComponent } from './letters/send-letter/send-letter.component';
import { SearchCandidatesComponent } from './shared/search-candidates/search-candidates.component';
import { UpdateCandidateDialogComponent } from './candidates/update-candidate-dialog/update-candidate-dialog.component';
import { PlannerComponent } from './planning/planner/planner.component';
import { ScheduleComponent } from './planning/planner/schedule/schedule.component';
import { MakeFreeSpotsDialogComponent } from './planning/planner/make-free-spots-dialog/make-free-spots-dialog.component';
import { UpdateLetterComponent } from './letters/update-letter/update-letter.component';
import { UpdateEducationalProgramComponent } from './educational-programs/update-educational-program/update-educational-program.component';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    WriteFeedbackComponent,
    ReadFeedbackComponent,
    SearchCandidateComponent,
    CandidateListComponent,
    PlanningComponent,
    EducationalProgramsComponent,
    LettersComponent,
    ReportComponent,
    CreateEducationalProgramComponent,
    CreateLettersTempComponent,
    SendLetterComponent,
    SearchCandidatesComponent,
    UpdateCandidateDialogComponent,
    PlannerComponent,
    ScheduleComponent,
    MakeFreeSpotsDialogComponent,
    CandidatesComponent,
    UpdateLetterComponent,
    UpdateEducationalProgramComponent,
    ConfirmationDialogComponent,
  ],

  imports: [CommonModule, AppRoutingModule, AppMaterialModule, FormsModule, ReactiveFormsModule, ChartModule],
})
export class DashboardModule {}
