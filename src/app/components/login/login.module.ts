import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/app-material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AppRoutingModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
})
export class LoginModule {}
