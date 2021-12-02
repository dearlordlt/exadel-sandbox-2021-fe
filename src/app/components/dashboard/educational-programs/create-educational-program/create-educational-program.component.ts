import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { pairwise, startWith } from 'rxjs/operators';
import { EducationalProgram } from '../../../shared/interfaces/educational-program/educational-program.interface';
import { PostEducationalProgram } from '../../../shared/interfaces/educational-program/post-educational-program.interface';
import { Position } from '../../../shared/interfaces/educational-program/post-educational-program.interface';
import { EducationalProgramsService } from '../../../../service/http/educational-programs/educational-programs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { DateValidators, SameDateErrorStateMatcher } from '../../shared/validators/same-date.validator';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-create-educational-program',
  templateUrl: './create-educational-program.component.html',
  styleUrls: ['./create-educational-program.component.scss'],
})
export class CreateEducationalProgramComponent implements OnInit {
  programForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    acceptancePeriodGroup: this.fb.group(
      {
        acceptancePeriodStartDate: ['', [Validators.required]],
        acceptancePeriodEndDate: ['', Validators.required],
      },
      {
        validator: DateValidators.sameDate('acceptancePeriodStartDate', 'acceptancePeriodEndDate', {
          acceptancePeriodSameDate: true,
        }),
      }
    ),
    programsPeriodGroup: this.fb.group(
      {
        programsPeriodStartDate: ['', [Validators.required]],
        programsPeriodEndDate: ['', Validators.required],
      },
      {
        validator: DateValidators.sameDate('programsPeriodStartDate', 'programsPeriodEndDate', {
          programsPeriodSameDate: true,
        }),
      }
    ),
    numberOfPositions: 1,
    positions: this.fb.array([
      this.fb.group({
        positionName: ['', [Validators.required]],
        descriptionAndRequirements: ['', [Validators.required]],
      }),
    ]),
  });

  // Matcher is needed to use <mat-error> tag with group validators
  sameDateErrorStateMatcher = new SameDateErrorStateMatcher();

  minProgramsDate: Date = new Date();

  private numberOfPositionsSubscription: Subscription = new Subscription();

  constructor(
    private educationalProgramsService: EducationalProgramsService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dateAdapter.setLocale('en-GB');
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
  }

  onNumberOfPositionsChanges(): void {
    const numberOfPositions = this.programForm.get('numberOfPositions');
    if (numberOfPositions !== null) {
      this.numberOfPositionsSubscription = numberOfPositions.valueChanges
        .pipe(startWith(1), pairwise())
        .subscribe(([prevVal, nextVal]: [any, any]) => {
          const changeInPositions = nextVal - prevVal;

          if (changeInPositions < 0) {
            for (let i = prevVal; i > nextVal; i--) {
              this.deletePosition(i - 1);
            }
          } else {
            for (let i = 0; i < changeInPositions; i++) {
              this.addPosition();
            }
          }
        });
    }
  }

  onSubmit(): void {
    if (this.programForm.valid) {
      const educationalProgram: PostEducationalProgram = this.mapFormValuesToPostEducationalProgramInterface();
      this.educationalProgramsService.postEducationalProgram(educationalProgram).subscribe((data: EducationalProgram) =>
        this.router.navigate(['../educational-programs'], { relativeTo: this.route }).then(() => {
          this.toastr.success('Educational program is created', 'Success');
        })
      );
    }
  }

  mapFormValuesToPostEducationalProgramInterface(): PostEducationalProgram {
    // Use moment lib to trim the time part from the date
    const postEducationalProgram: PostEducationalProgram = {
      name: this.programForm.get('name')!.value,
      appAcceptFrom: moment(this.programForm.get('acceptancePeriodGroup.acceptancePeriodStartDate')!.value).format(moment.HTML5_FMT.DATE),
      appAcceptTo: moment(this.programForm.get('acceptancePeriodGroup.acceptancePeriodEndDate')!.value).format(moment.HTML5_FMT.DATE),
      eduProgFrom: moment(this.programForm.get('programsPeriodGroup.programsPeriodStartDate')!.value).format(moment.HTML5_FMT.DATE),
      eduProgTo: moment(this.programForm.get('programsPeriodGroup.programsPeriodEndDate')!.value).format(moment.HTML5_FMT.DATE),
      posiForEduPros: [],
    };

    this.positions.value.forEach((element: { positionName: string; descriptionAndRequirements: string }) => {
      const position: Position = {
        name: element.positionName,
        descrAndRequ: element.descriptionAndRequirements,
      };
      postEducationalProgram.posiForEduPros.push(position);
    });

    return postEducationalProgram;
  }
}
