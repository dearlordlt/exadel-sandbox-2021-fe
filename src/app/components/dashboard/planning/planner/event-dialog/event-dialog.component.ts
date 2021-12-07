import { Component, OnInit, Inject, ComponentFactoryResolver } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidatesService } from 'src/app/service/http/candidate-list/services/candidates.service';

import { DataObj1, DataObj2 } from '../plannerData';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.scss'],
})
export class EventDialogComponent implements OnInit {
  candidates: string[] = [];
  skypeList: string[] = [];
  admin = this.data.role === 'Administrator' ? true : false;
  skype = '';
  constructor(
    public dialogRef: MatDialogRef<DataObj2>,
    @Inject(MAT_DIALOG_DATA) public data: { main: DataObj1; date: string; elem: DataObj2; role: string },
    private candidatesService: CandidatesService
  ) {}

  ngOnInit(): void {
    this.getCandidates();
  }

  getCandidates() {
    this.candidatesService.getCandidates().subscribe((data) => {
      data.forEach((element) => {
        const name = `${element.firstname} ${element.lastname}`;
        this.candidates.push(name);
        this.skypeList.push(element.contactSkype);
      });
    });
  }

  getSkype(candidate: string) {
    // if (this.data.elem.candidate) {
    this.data.elem.candidate = candidate;
    this.data.elem.taken = true;
    this.candidates.forEach((el, ind) => {
      if (el === this.data.elem.candidate) {
        this.data.elem.skype = this.skypeList[ind];
      }
    });
  }

  onDelete() {
    this.candidates = [];
    this.skypeList = [];
    this.dialogRef.close(this.data);
    this.data.elem = { ...this.data.elem, candidate: '', skype: '', description: '', taken: false };
  }
  // }
}
