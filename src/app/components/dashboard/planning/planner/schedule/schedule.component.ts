import { Component, Input } from '@angular/core';
import { PlannerData } from '../../../../../global/planner-data';
import { MatDialog } from '@angular/material/dialog';
import { MakeFreeSpotsDialogComponent } from '../make-free-spots-dialog/make-free-spots-dialog.component';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  displayedColumns: string[] = [
    'name',
    'position',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
  ];
  dataSource = PlannerData;

  _date: string | null = null;

  @Input() set date(value: string) {
    this._date = moment(value, 'GMT').tz('Europe/Kiev').format();
  }

  @Input() _educationalProgramId: string | null = null;

  constructor(public dialog: MatDialog) {}

  openFreeSpotsDialog() {
    const dialogRef = this.dialog.open(MakeFreeSpotsDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
