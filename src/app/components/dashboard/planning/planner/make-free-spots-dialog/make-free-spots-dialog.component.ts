import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { schedulerTimeSpots } from '../../../../../global/constants';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataObj1 } from '../plannerData';
import { NodeCompatibleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { PlannerData } from 'src/app/global/planner-data';

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

  // freeSpotsFrom: string[] = schedulerTimeSpots.from;
  // freeSpotsTo: string[] = schedulerTimeSpots.to;
  freeSpotsFrom: { id: number; time: string }[] = schedulerTimeSpots.from;
  freeSpotsTo: { id: number; time: string }[] = schedulerTimeSpots.to;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DataObj1) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  onCancelClick(): void {
    // this.dialogRef.close();
  }

  get freeSpotsForms(): FormArray {
    return this.freeSpotsForm.get('freeSpots') as FormArray;
  }

  addFreeSpot(): void {
    const freeSpot = this.fb.group({
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
    });

    this.freeSpotsForms.push(freeSpot);
  }

  deleteFreeSpot(i: number): void {
    this.freeSpotsForms.removeAt(i);
  }
}
