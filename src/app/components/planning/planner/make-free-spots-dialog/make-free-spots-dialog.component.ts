import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { schedulerTimeSpots } from '../../../../global/constants';

@Component({
  selector: 'app-make-free-spots-dialog',
  templateUrl: './make-free-spots-dialog.component.html',
  styleUrls: ['./make-free-spots-dialog.component.scss'],
})
export class MakeFreeSpotsDialogComponent implements OnInit {
  freeSpotsForm: FormGroup = this.fb.group({
    freeSpots: this.fb.array([
      {
        from: '',
        to: '',
      },
    ]),
  });

  freeSpotsFrom: string[] = schedulerTimeSpots.from;
  freeSpotsTo: string[] = schedulerTimeSpots.to;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    //this.dialogRef.close();
  }

  get freeSpotsForms(): FormArray {
    return this.freeSpotsForm.get('freeSpots') as FormArray;
  }

  addFreeSpot(): void {
    const freeSpot = this.fb.group({
      from: '',
      to: '',
    });

    this.freeSpotsForms.push(freeSpot);
  }

  deleteFreeSpot(i: number): void {
    this.freeSpotsForms.removeAt(i);
  }
}
