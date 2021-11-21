import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { CandidateRegistrationModule } from './components/candidate-registration/candidate-registration.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { LoginModule } from './components/login/login.module';

import { LogoutComponent } from './components/dashboard/shared/logout/logout.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CandidateRegistrationModule,
    DashboardModule,
    LoginModule,
  ],
  providers: [],
  entryComponents: [LogoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
