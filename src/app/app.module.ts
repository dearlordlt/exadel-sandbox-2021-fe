import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CandidateRegistrationModule } from './components/candidate-registration/candidate-registration.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { LoginModule } from './components/login/login.module';
import { ToastrModule } from 'ngx-toastr';

import { LogoutComponent } from './components/dashboard/shared/logout/logout.component';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './service/http/interceptors/auth/auth.interceptor';
import { ErrorsInterceptor } from './service/http/interceptors/errors/errors.interceptor';
import { LoaderInterceptor } from './service/http/interceptors/loader/loader.interceptor';

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
    MatProgressBarModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      autoDismiss: true,
      maxOpened: 1,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  entryComponents: [LogoutComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
