import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { statuses } from 'src/app/global/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-sample',
  templateUrl: './form-sample.component.html',
  styleUrls: ['./form-sample.component.scss'],
})
export class FormSampleComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router) {}

  submitted = false;
  createbtn: boolean = false;
  message = "Letter's template is created";

  @Input() submitbtn = this.createbtn;

  profileForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    status: [''],
    from: [''],
    subject: ['', [Validators.maxLength(100), Validators.required]],
    text: ['', [Validators.maxLength(1500), Validators.required]],
    signature: ['', [Validators.maxLength(100), Validators.required]],
  });
  candidate_status = statuses.select;

  get profileFormControls() {

    return this.profileForm.controls;
  }

  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
  }

  deletePage() {}

  savePage() {
    this.router.navigate(['/', 'letters']);
    alert(this.message);
  }
}
