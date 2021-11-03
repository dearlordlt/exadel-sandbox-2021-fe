import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutComponent } from '../logout/logout.component';
@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
  navigation = ['Candidates', 'Planning', 'Educational programs', 'Letters', 'Report']

  constructor(public dialog: MatDialog) {}
  //constructor() { }
  ngOnInit(): void {
  }

  openDialog(){
    const dialogRef = this.dialog.open(LogoutComponent, {data: {name: "username"}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }

}
