import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { statuses, englishLevels, countries } from 'src/app/global/constants';
import { StaticService } from 'src/app/service/http/static/static.service';
import { Candidate } from '../../../models/candidate';
import { StaticData } from '../../../models/staticData';
@Component({
  selector: 'app-update-candidate-dialog',
  templateUrl: './update-candidate-dialog.component.html',
  styleUrls: ['./update-candidate-dialog.component.scss'],
})
export class UpdateCandidateDialogComponent implements OnInit {
  statuses: string[] = [];
  englishLevel = englishLevels;
  country = countries;
  disableUpdate = false;
  constructor(
    public dialogRef: MatDialogRef<Candidate>,
    @Inject(MAT_DIALOG_DATA) public data: Candidate,
    private staticService: StaticService
  ) {}

  ngOnInit(): void {
    this.staticService.getCandidateStatus().subscribe((data) => {
      const keys: string[] = Object.keys(data);
      for (const key in keys) {
        this.statuses.push(data[keys[key]]);
      }
    });
  }
  checkValues() {
    if (
      !this.data.firstname.trim() ||
      !this.data.lastname.trim() ||
      !this.data.email.trim() ||
      !this.data.contactSkype.trim() ||
      !this.data.contactPhone.trim() ||
      !this.data.city.trim()
    ) {
      this.disableUpdate = true;
    } else {
      this.disableUpdate = false;
    }
  }
}
