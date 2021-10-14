import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/dashboard/header/header.component';
import { UserInfoComponent } from './components/dashboard/header/user-info/user-info.component';
import { AppLogoComponent } from './components/dashboard/header/app-logo/app-logo.component';
import { UserDropdownMenuComponent } from './components/dashboard/header/user-dropdown-menu/user-dropdown-menu.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, UserInfoComponent, AppLogoComponent, UserDropdownMenuComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
