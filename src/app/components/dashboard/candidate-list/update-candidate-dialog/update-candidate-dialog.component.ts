import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { statuses, englishLevels, countries } from 'src/app/global/constants';
import { Candidate } from '../../../models/candidate';
@Component({
  selector: 'app-update-candidate-dialog',
  templateUrl: './update-candidate-dialog.component.html',
  styleUrls: ['./update-candidate-dialog.component.scss'],
})
export class UpdateCandidateDialogComponent implements OnInit {
  status = statuses.select;
  englishLevel = englishLevels;
  country = countries;
  disableUpdate = false;
  constructor(public dialogRef: MatDialogRef<Candidate>, @Inject(MAT_DIALOG_DATA) public data: Candidate) {}

  ngOnInit(): void {}
  checkValues() {
    if (
      !this.data.firstname.trim() ||
      !this.data.lastname.trim() ||
      !this.data.email.trim() ||
      !this.data.skype.trim() ||
      !this.data.phone_number.trim() ||
      !this.data.city.trim()
    ) {
      this.disableUpdate = true;
    } else {
      this.disableUpdate = false;
    }
  }
}
