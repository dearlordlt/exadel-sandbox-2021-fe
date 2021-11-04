import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { pairwise, startWith } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-create-educational-program',
  templateUrl: './create-educational-program.component.html',
  styleUrls: ['./create-educational-program.component.scss'],
})
export class CreateEducationalProgramComponent implements OnInit {
  programForm: FormGroup = this.fb.group({
    acceptancePeriodStartDate: ['', [Validators.required]],
    acceptancePeriodEndDate: ['', [Validators.required]],
    programsPeriodStartDate: ['', [Validators.required]],
    programsPeriodEndDate: ['', [Validators.required]],
    name: ['', [Validators.required]],
    numberOfPositions: 1,
    positions: this.fb.array([
      this.fb.group({
        positionName: '',
        descriptionAndRequirements: '',
      }),
    ]),
  });

  private numberOfPositionsSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.onNumberOfPositionsChanges(); // Used to add or remove positions/techonologies inputs
  }

  ngOnDestroy() {
    this.numberOfPositionsSubscription.unsubscribe();
  }

  get positions() {
    return this.programForm.get('positions') as FormArray;
  }

  addPosition() {
    const position = this.fb.group({
      positionName: ['', [Validators.required]],
      descriptionAndRequirements: ['', [Validators.required]],
    });

    this.positions.push(position);
  }

  deletePosition(i: number) {
    this.positions.removeAt(i);
    console.log('detePosition, i = ', i);
  }

  onNumberOfPositionsChanges(): void {
    // Had to check for null because TS was throwing a Object is possibly ‘null’ error
    const numberOfPositions = this.programForm.get('numberOfPositions');
    if (numberOfPositions !== null) {
      this.numberOfPositionsSubscription = numberOfPositions.valueChanges
        .pipe(startWith(1), pairwise())
        .subscribe(([prevVal, nextVal]: [any, any]) => {
          const changeInPositions = nextVal - prevVal;
          if (changeInPositions < 0) for (let i = prevVal; i > nextVal; i--) this.deletePosition(i - 1);
          // -1 because in template they are indexed from 0
          else for (let i = 0; i < changeInPositions; i++) this.addPosition();
        });
    }
  }

  onSubmit(): void {}
}
