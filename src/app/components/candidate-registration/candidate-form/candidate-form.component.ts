import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { SubmitDialogComponent } from '../submit-dialog/submit-dialog.component';

import { HttpClient } from '@angular/common/http';
import { StaticService } from 'src/app/service/http/static/static.service';
import { EducationalProgramsService } from 'src/app/service/http/educational-programs/educational-programs.service';
import { CandidatesService } from '../../dashboard/candidates/services/candidates.service';

import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {
  registrationForm: FormGroup = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    contactSkype: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(/@[a-zA-Z ]*.[a-zA-Z ]*/)]],
    contactPhone: ['', [Validators.required, Validators.pattern(/[0-9]{12}/)]],
    country: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]*/)]],
    city: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]*/)]],
    englishLevel: ['', [Validators.required]],
    contactTime: ['', [Validators.required]],
    planToJoinExadel: ['', [Validators.required]],
    checkBox: ['', [Validators.required]],
    statusMark: [1],
    educationProgramId: [''],
    positionId: [''],
  });
  programs: { id: string; name: string }[] = [];
  positions: { id: string; name: string; desc: string }[] = [];
  description!: string;
  levels!: string[];
  countries!: string[];
  contactTimes!: string[];
  decisions!: string[];
  initialValues = this.registrationForm.value;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private staticService: StaticService,
    private educationalProgramsService: EducationalProgramsService,
    private candidatesService: CandidatesService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPrograms();
    this.geStaticData();
  }

  geStaticData() {
    this.staticService.getEnglishLevels().subscribe((data) => {
      this.levels = Object.values(data);
    });
    this.staticService.getListofCountries().subscribe((data) => {
      this.countries = Object.values(data);
    });
    this.staticService.getTimeSlots().subscribe((data) => {
      this.contactTimes = Object.values(data);
    });
    this.staticService.getPlanningtoJoin().subscribe((data) => {
      this.decisions = Object.values(data);
    });
  }
  getPrograms() {
    this.educationalProgramsService.getEducationalProgramsForRegistration().subscribe((data) => {
      data.forEach((program) => {
        this.programs.push({ id: program.id, name: program.name });
      });
    });
  }
  getPositions(id: string) {
    this.educationalProgramsService.getEducationalProgramForRegistration(id).subscribe((data) => {
      data.positions.forEach((position) => {
        this.positions.push({ id: position.id, name: position.name, desc: position.descrAndRequ });
      });
    });
  }
  getDescription(id: string) {
    this.positions.forEach((postion) => {
      if (id === postion.id) {
        this.description = postion.desc;
      }
    });
  }
  getFormError() {
    return 'This field is required';
  }
  getCheckBoxError() {
    return 'If you do not consent to the processing of personal data for the purposes and on terms specified in Privacy Policy, Exadel will not have the right to process your personal data and cannot allow you to participate in the event.';
  }
  getEmailError() {
    if (this.registrationForm.controls['email'].hasError('required')) {
      return 'You must enter an email';
    }
    return 'Not a valid email';
  }
  getPhoneError() {
    if (this.registrationForm.controls['contactPhone'].hasError('required')) {
      return 'You must enter an phone number';
    }
    return 'You must enter only 12 numbers';
  }
  getCityError() {
    if (this.registrationForm.controls['city'].hasError('required')) {
      return 'This field is required';
    }
    return 'City name should contain only letters';
  }
  showPostion(id: string) {
    this.positions = [];
    this.registrationForm.controls.positionId.setValue('');
    this.getPositions(id);
  }

  openSubmitDialog(formDirective: FormGroupDirective) {
    const dialogRef = this.dialog.open(SubmitDialogComponent, { data: this.registrationForm.value });
    dialogRef.afterClosed().subscribe(() => {
      formDirective.resetForm();
      this.registrationForm.reset(this.initialValues);
      this.positions = [];
      this.submitted = false;
    });
  }

  submitted = false;
  onSubmit(formDirective: FormGroupDirective) {
    this.submitted = true;
    if (this.registrationForm.valid) {
      const sendData = { postDateTimeNow: moment().format(), ...this.registrationForm.value };
      this.candidatesService.addCandidate(sendData).subscribe(() => {
        this.openSubmitDialog(formDirective);
      });
    }
  }
}
