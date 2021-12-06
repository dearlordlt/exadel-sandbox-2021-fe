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
    console.log(this.data.elem.candidate);
  }

  getCandidates() {
    this.candidatesService.getSearchedCandidates().subscribe((data) => {
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
    console.log('run', this.data.elem.candidate);
    this.candidates.forEach((el, ind) => {
      if (el === this.data.elem.candidate) {
        this.data.elem.skype = this.skypeList[ind];
      }
    });
  }

  onDelete() {
    this.data.elem.candidate = '';
    this.data.elem.skype = '';
    this.data.elem.description = '';
    this.data.elem.taken = false;
    console.log(this.data.elem);
    this.dialogRef.close(this.data);
  }
  // }
}
