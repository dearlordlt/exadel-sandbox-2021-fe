import { Component } from '@angular/core';
import { statuses } from 'src/app/global/constants';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-letters-temp',
  templateUrl: './create-letters-temp.component.html',
  styleUrls: ['./create-letters-temp.component.scss'],
})
export class CreateLettersTempComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    status: [''],
    from: [''],
    subject: ['', [Validators.maxLength(100), Validators.required]],
    text: ['', [Validators.maxLength(1500), Validators.required]],
    signature: ['', [Validators.maxLength(100), Validators.required]],
  });
  candidate_status = statuses;
  submitted = false;

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    this.router.navigate(['/', 'letters']);
  }
}
