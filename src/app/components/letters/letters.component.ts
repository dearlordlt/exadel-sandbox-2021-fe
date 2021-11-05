import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Date_Elements } from '../models/dateElements';


const table_Data: Date_Elements[] = [
  {date:"27.10.2021", desc:"the application is accepted"},
  {date:"25.10.2021", desc:"refusal by the level of English" },
  {date:"24.10.2021", desc:"refusal by location" },
  {date:"23.10.2021", desc:"failure on the technical level"},
  {date:"22.10.2021", desc:"in reserve" },
  {date:"18.10.2021", desc:"accepted for Sandbox"}
]


@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent implements OnInit {

  displayedColumns: string[] = ["dateUpdate", "Name","edit"];
  dataSource = new MatTableDataSource(table_Data)

  constructor() {
  }

  ngOnInit(): void {

  }
}
