import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaticService } from 'src/app/service/http/static/static.service';
import { Candidate } from '../../../models/candidate';
@Component({
  selector: 'app-update-candidate-dialog',
  templateUrl: './update-candidate-dialog.component.html',
  styleUrls: ['./update-candidate-dialog.component.scss'],
})
export class UpdateCandidateDialogComponent implements OnInit {
  statuses: string[] = [];
  englishLevel: string[] = [];
  country: string[] = [];
  disableUpdate = false;
  showFields = this.data.role !== 'Manager' ? true : false;
  showStatus = this.data.role === 'Recruiter' && this.data.candidate.statusMark > 5 ? false : true;
  constructor(
    public dialogRef: MatDialogRef<Candidate>,
    @Inject(MAT_DIALOG_DATA) public data: { candidate: Candidate; role: string },
    private staticService: StaticService
  ) {}

  ngOnInit(): void {
    this.getStatuses();
    this.getEnglishLevels();
    this.getCountries();
  }

  getStatuses() {
    this.staticService.getCandidateStatus().subscribe((data) => {
      const keys: string[] = Object.keys(data);
      if (this.data.role === 'Recruiter') {
        for (const key in keys) {
          if (parseInt(key) < 5) {
            this.statuses.push(data[keys[key]]);
          }
        }
      } else {
        for (const key in keys) {
          this.statuses.push(data[keys[key]]);
        }
      }
    });
  }

  getEnglishLevels() {
    this.staticService.getEnglishLevels().subscribe((data) => {
      this.englishLevel = Object.values(data);
    });
  }

  getCountries() {
    this.staticService.getListofCountries().subscribe((data) => {
      this.country = data;
    });
  }

  checkValues() {
    if (
      !this.data.candidate.firstname.trim() ||
      !this.data.candidate.lastname.trim() ||
      !this.data.candidate.email.trim() ||
      !this.data.candidate.contactSkype.trim() ||
      !this.data.candidate.contactPhone.trim() ||
      !this.data.candidate.city.trim()
    ) {
      this.disableUpdate = true;
    } else {
      this.disableUpdate = false;
    }
  }
}
