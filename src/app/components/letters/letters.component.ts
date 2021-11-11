import { Component,ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Date_Elements } from '../models/dateElements';


const table_Data: Date_Elements[] = [
  {addDateTime:"27.10.2021", subject:"the application is accepted"},
  {addDateTime:"25.10.2021", subject:"refusal by the level of English" },
  {addDateTime:"24.10.2021", subject:"refusal by location" },
  {addDateTime:"23.10.2021", subject:"failure on the technical level"},
  {addDateTime:"22.10.2021", subject:"in reserve" },
  {addDateTime:"18.10.2021", subject:"accepted for Sandbox"}
]

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent  {

  displayedColumns: string[] = ["dateUpdate", "Name","edit"];
  dataSource = new MatTableDataSource(table_Data)

  constructor() {}

}
