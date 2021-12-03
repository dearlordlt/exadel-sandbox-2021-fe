import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { pairwise, startWith } from 'rxjs/operators';
import { EducationalProgram, Position } from '../../../shared/interfaces/educational-program/educational-program.interface';
import { EducationalProgramsService } from '../../../../service/http/educational-programs/educational-programs.service';
import { DateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { DateValidators } from '../../shared/validators/same-date.validator';
import { SameDateErrorStateMatcher } from '../../shared/validators/same-date.validator';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-update-educational-program',
  templateUrl: './update-educational-program.component.html',
  styleUrls: ['./update-educational-program.component.scss'],
})
export class UpdateEducationalProgramComponent implements OnInit {
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
        positionId: '',
        positionName: ['', [Validators.required]],
        descriptionAndRequirements: ['', [Validators.required]],
      }),
    ]),
  });

  // Matcher is needed to use <mat-error> tag with group validators
  sameDateErrorStateMatcher = new SameDateErrorStateMatcher();

  private numberOfPositionsSubscription: Subscription = new Subscription();

  educationalProgramId: string = '';
  educationalProgram: EducationalProgram = {} as EducationalProgram;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private educationalProgramsService: EducationalProgramsService,
    private router: Router,
    private dateAdapter: DateAdapter<Date>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.educationalProgramId = this.route.snapshot.paramMap.get('educationalProgramId')!;

    this.dateAdapter.setLocale('en-GB');
    this.onNumberOfPositionsChanges(); // Used to add or remove positions/techonologies input fields

    if (this.educationalProgramId) {
      this.educationalProgramsService.getEducationalProgram(this.educationalProgramId).subscribe((data: EducationalProgram) => {
        this.educationalProgram = data;
        this.initializeFormWithEducationalProgramData();
      });
    }
  }

  ngOnDestroy() {
    this.numberOfPositionsSubscription.unsubscribe();
  }

  getEducationalProgram() {
    this.educationalProgramsService
      .getEducationalProgram(this.educationalProgramId)
      .subscribe((data: EducationalProgram) => (this.educationalProgram = data));
  }

  initializeFormWithEducationalProgramData() {
    this.programForm.patchValue({
      acceptancePeriodGroup: {
        acceptancePeriodStartDate: this.educationalProgram.appAcceptFrom,
        acceptancePeriodEndDate: this.educationalProgram.appAcceptTo,
      },
      programsPeriodGroup: {
        programsPeriodStartDate: this.educationalProgram.eduProgFrom,
        programsPeriodEndDate: this.educationalProgram.eduProgTo,
      },
      name: this.educationalProgram.name,
      numberOfPositions: this.educationalProgram.positions.length,
    });

    this.educationalProgram.positions.forEach((position, index) => {
      this.positions.at(index).patchValue({
        positionId: position.id,
        positionName: position.name,
        descriptionAndRequirements: position.descrAndRequ,
      });
    });
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
      const updateEducationalProgram: EducationalProgram = this.mapFormValuesToEducationalProgramInterface();
      this.educationalProgramsService
        .updateEducationalProgram(this.educationalProgramId, updateEducationalProgram)
        .subscribe((data: EducationalProgram) =>
          this.router.navigate(['dashboard/educational-programs']).then(() => {
            this.toastr.success('Educational program was updated', 'Success');
          })
        );
    }
  }

  mapFormValuesToEducationalProgramInterface() {
    // Use moment lib to trim the time part from the date
    const updateEducationalProgram: EducationalProgram = {
      name: this.programForm.get('name')!.value,
      appAcceptFrom: moment(this.programForm.get('acceptancePeriodGroup.acceptancePeriodStartDate')!.value).format(moment.HTML5_FMT.DATE),
      appAcceptTo: moment(this.programForm.get('acceptancePeriodGroup.acceptancePeriodEndDate')!.value).format(moment.HTML5_FMT.DATE),
      eduProgFrom: moment(this.programForm.get('programsPeriodGroup.programsPeriodStartDate')!.value).format(moment.HTML5_FMT.DATE),
      eduProgTo: moment(this.programForm.get('programsPeriodGroup.programsPeriodEndDate')!.value).format(moment.HTML5_FMT.DATE),
      positions: [],
    };

    this.positions.value.forEach((element: { positionId: string; positionName: string; descriptionAndRequirements: string }) => {
      const position: Position = {
        name: element.positionName,
        descrAndRequ: element.descriptionAndRequirements,
      };
      if (element.positionId) position.id = element.positionId;
      updateEducationalProgram.positions.push(position);
    });

    return updateEducationalProgram;
  }
}
