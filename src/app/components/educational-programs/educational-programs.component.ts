import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-educational-programs',
  templateUrl: './educational-programs.component.html',
  styleUrls: ['./educational-programs.component.scss'],
})
export class EducationalProgramsComponent implements OnInit {
  programForm: FormGroup = this.fb.group({
    acceptancePeriodStartDate: '',
    acceptancePeriodEndDate: '',
    programsPeriodStartDate: '',
    programsPeriodEndDate: '',
    name: '',
    numberOfPositions: 1,
    positions: this.fb.array([
      this.fb.group({
        positionName: '',
        descriptionAndRequirements: '',
      }),
    ]),
  });

  // Below throws property 'numberOfPositionsSubscription' has no initializer and is not definitely assigned in the constructor.
  //private numberOfPositionsSubscription:Subscription

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.programForm.valueChanges.subscribe(console.log);
    this.onNumberOfPositionsChanges(); // Used to add or remove positions/techonologies inputs
  }

  ngOnDestroy() {
    const positions = this.programForm.get('numberOfPositions');
    if (positions !== null) positions.valueChanges.subscribe().unsubscribe();
  }

  get positions() {
    return this.programForm.get('positions') as FormArray;
  }

  addPosition() {
    const position = this.fb.group({
      positionName: '',
      descriptionAndRequirements: '',
    });

    this.positions.push(position);
  }

  deletePosition(i: any) {
    this.positions.removeAt(i);
  }

  onNumberOfPositionsChanges(): void {
    // Had to check for null because TS was throwing a Object is possibly ‘null’ error
    const positions = this.programForm.get('numberOfPositions');
    if (positions !== null) {
      positions.valueChanges.subscribe((val) => {
        this.addPosition();
      });
    }
  }

  onSubmit(): void {}
}
