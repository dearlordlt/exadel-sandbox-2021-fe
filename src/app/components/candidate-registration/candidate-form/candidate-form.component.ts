import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { StaticService } from 'src/app/service/http/static/static.service';
import { EducationalProgramsService } from 'src/app/service/http/educational-programs/educational-programs.service';
import { CandidatesService } from '../../dashboard/candidates/services/candidates.service';

import * as moment from 'moment';

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
    email: ['', [Validators.required, Validators.email]],
    contactPhone: ['', [Validators.required, Validators.pattern(/[0-9]{12}/)]],
    country: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]*/)]],
    city: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]*/)]],
    englishLevel: ['', [Validators.required]],
    contactTime: ['', [Validators.required]],
    planToJoinExadel: ['', [Validators.required]],
    checkBox: ['', [Validators.required]],
    statusMark: [1],
    educationProgramId: ['', [Validators.required]],
    positionId: ['', [Validators.required]],
  });
  programs: { id: string; name: string }[] = [];
  positions: { id: string; name: string; desc: string }[] = [];
  description!: string;
  levels!: string[];
  countries!: string[];
  contactTimes!: string[];
  decisions!: string[];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private staticService: StaticService,
    private educationalProgramsService: EducationalProgramsService,
    private candidatesService: CandidatesService
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

  showPostion(id: string) {
    this.positions = [];
    this.registrationForm.controls.positionId.setValue('');
    this.getPositions(id);
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const sendData = { postDateTimeNow: moment().format(), ...this.registrationForm.value };
      this.candidatesService.addCandidate(sendData).subscribe((data) => {
        console.log('ADDED', data);
      });
    }
  }
}
