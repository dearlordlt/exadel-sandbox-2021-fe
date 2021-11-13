import { Component, OnInit } from '@angular/core';

import { statuses } from 'src/app/global/constants';

@Component({
  selector: 'app-event-planner',
  templateUrl: './event-planner.component.html',
  styleUrls: ['./event-planner.component.scss'],
})
export class EventPlannerComponent implements OnInit {
  skype = 'live:454sd545s';

  statuses = statuses.select;

  constructor() {}

  ngOnInit(): void {}
}
