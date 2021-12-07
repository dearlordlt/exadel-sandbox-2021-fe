import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EducationalProgram } from '../../../shared/interfaces/educational-program/educational-program.interface';
import { EducationalProgramsService } from '../../../../service/http/educational-programs/educational-programs.service';
import { PlannerData } from '../../../../global/planner-data';
import { MatDialog } from '@angular/material/dialog';
import { MakeFreeSpotsDialogComponent } from './make-free-spots-dialog/make-free-spots-dialog.component';
import { DataObj1, DataObj2 } from './plannerData';
import * as moment from 'moment';
import 'moment-timezone';
import { PlannerService } from './planner-service/planner.service';
import { ElementSchemaRegistry } from '@angular/compiler';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
})
export class PlannerComponent implements OnInit {
  programForm: FormGroup = this.fb.group({
    date: moment().format(),
  });
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
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
  ];
  dataSource!: DataObj1[];
  // dataSource = [];
  educationalProgramId = '';
  educationalProgram: EducationalProgram = {} as EducationalProgram;
  userRole!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private educationalProgramsService: EducationalProgramsService,
    public dialog: MatDialog,
    private plannerService: PlannerService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.educationalProgramId = this.route.snapshot.paramMap.get('educationalProgramId')!;
    // if (this.educationalProgramId) this.getEducationalProgram();
    this.getdata();
    this.getRole();
  }

  getRole() {
    this.authService.getEmployee(localStorage.getItem('id') || '').subscribe((data) => {
      this.userRole = data.empPosition;
    });
  }

  getEducationalProgram() {
    this.educationalProgramsService
      .getEducationalProgram(this.educationalProgramId)
      .subscribe((data: EducationalProgram) => (this.educationalProgram = data));
  }

  dateEvent() {
    console.log(this.programForm.value.date);
    this.getdata();
  }

  getdata() {
    this.plannerService.getEventData().subscribe((data) => {
      let notfound = true;
      data.forEach((item) => {
        if (notfound && item.id === moment(this.programForm.value.date).format(moment.HTML5_FMT.DATE)) {
          console.log('TRUEEEE?', item.userData);
          this.dataSource = item.userData;
          notfound = false;
        } else if (notfound) {
          this.dataSource = [];
        }
      });
    });
  }

  addEvent(elements: DataObj1, element: DataObj2) {
    if (this.userRole === 'Interviewer' && !element.taken) {
      this.updateAvailable(elements, element);
    } else if (this.userRole === 'Interviewer' && element.taken) {
      this.openEventDialog(elements, element);
    } else if (this.userRole === 'Administrator' && element.available) {
      this.openEventDialog(elements, element);
    }
  }

  updateAvailable(elements: DataObj1, element: DataObj2) {
    const sendEl = elements;
    const checkEl = { ...element, available: !element.available };
    sendEl.eventData = sendEl.eventData.map((el) => {
      if (el.id === element.id) {
        return checkEl;
      } else {
        return el;
      }
    });
    const date = moment(this.programForm.value.date).format(moment.HTML5_FMT.DATE);
    const data = { id: date, userData: [sendEl] };
    this.plannerService.putEventData(date, data).subscribe(() => {
      this.getdata();
    });
  }

  updateData(elements: DataObj1, element: DataObj2) {
    const sendEl = elements;
    sendEl.eventData = sendEl.eventData.map((el) => {
      if (el.id === element.id) {
        return element;
      } else {
        return el;
      }
    });
    const date = moment(this.programForm.value.date).format(moment.HTML5_FMT.DATE);
    const data = { id: date, userData: [sendEl] };
    this.plannerService.putEventData(date, data).subscribe(() => {
      this.getdata();
    });
  }

  // show(elements: DataObj1) {
  //   console.log(elements);
  // }

  openEventDialog(elements: DataObj1, element: DataObj2) {
    const dialogRef = this.dialog.open(EventDialogComponent, {
      data: { main: elements, date: moment(this.programForm.value.date).format(moment.HTML5_FMT.DATE), elem: element, role: this.userRole },
      width: '800px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'cancel' && result !== undefined) {
        this.updateData(result.main, result.elem);
        this.getdata();
      }
    });
  }

  openFreeSpotsDialog(element: DataObj1) {
    const dialogRef = this.dialog.open(MakeFreeSpotsDialogComponent, { data: element });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
