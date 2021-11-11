import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MatTableModule, MatPaginatorModule, MatInputModule, MatIconModule, MatSelectModule, MatSortModule],
})
export class AppMaterialModule {
}
