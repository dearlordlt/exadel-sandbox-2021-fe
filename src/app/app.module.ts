import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidateRegistrationModule } from './candidate-registration/candidate-registration.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CandidateRegistrationModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
