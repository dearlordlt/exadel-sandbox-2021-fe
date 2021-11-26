import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { statuses } from 'src/app/global/constants';

@Component({
  selector: 'app-event-planner',
  templateUrl: './event-planner.component.html',
  styleUrls: ['./event-planner.component.scss'],
})
export class EventPlannerComponent implements OnInit {
  skype = 'live:454sd545s';

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

  maxChars = 500;
  newData!: string;
  statuses = statuses.select;
  showUpdate = false;

  ngOnInit(): void {
    // if (this.data.ninethirty === 'check') {
    //   this.showUpdate = true;
    // } else {
    //   this.showUpdate = false;
    // }
  }
}
