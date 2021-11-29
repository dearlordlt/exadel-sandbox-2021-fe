import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { educationalPrograms, englishLevels } from 'src/app/global/constants';
import { countries } from 'src/app/global/constants';
import { contactTime } from 'src/app/global/constants';
import { decision } from 'src/app/global/constants'
import { technologies } from 'src/app/global/constants';
import { technologyJsJava } from 'src/app/global/constants';
import { technologyJsNET } from 'src/app/global/constants';
import { technologyJsPHP } from 'src/app/global/constants';
@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.scss'],
})
export class CandidateFormComponent implements OnInit {
  registrationForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    skype: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/1-9/)]],
    country: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]*/)]],
    city: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]*/)]],
    engLevel: ['', [Validators.required]],
    contactTime: ['', [Validators.required]],
    decision: ['', [Validators.required]],
    checkBoxd: ['', [Validators.required]],
  });
  programs = educationalPrograms;
  technologies = technologies;
  levels = englishLevels;
  countries = countries;
  contactTimes = contactTime;
  decisions = decision;
  

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}