import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventPlannerComponent } from './event-planner/event-planner.component';
import { Events } from '../models/events';
import { EventsService } from './services/events.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  constructor(private eventsService: EventsService, public dialog: MatDialog) {}

  plannedEvents: Events[] = [];

  ngOnInit(): void {
    this.getEvents();
  }

  openDialog(data: any) {
    const dialogRef = this.dialog.open(EventPlannerComponent, {
      width: '60vw',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getEvents() {
    this.eventsService.getEvents().subscribe((res) => (this.plannedEvents = res));
  }
}
