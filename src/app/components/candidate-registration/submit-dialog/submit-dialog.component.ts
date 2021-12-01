import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EducationalProgramsService } from 'src/app/service/http/educational-programs/educational-programs.service';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.scss'],
})
export class SubmitDialogComponent implements OnInit {
  program!: string;
  position!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Candidate, private educationalProgramsService: EducationalProgramsService) {}
  ngOnInit(): void {
    this.getProgramAndPosition();
  }

  getProgramAndPosition() {
    this.educationalProgramsService.getEducationalProgramForRegistration(this.data.educationProgramId).subscribe((data) => {
      this.program = data.name;
    });
    this.educationalProgramsService.getPositions().subscribe((positions) => {
      positions.forEach((position) => {
        if (position.id === this.data.positionId) {
          this.position = position.name;
        }
      });
    });
  }
}
