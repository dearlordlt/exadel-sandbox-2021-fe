import { Component, OnInit } from '@angular/core';
import { statuses } from 'src/app/global/constants';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { pairwise, startWith } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-send-letter',
  templateUrl: './send-letter.component.html',
  styleUrls: ['./send-letter.component.scss'],
})
export class SendLetterComponent implements OnInit {
  letterForm: FormGroup = this.fb.group({
    fromEmail: [{ value: 'no-reply.sandbox@exadel.com', disabled: true }, [Validators.required, Validators.email]],
    toEmails: ['', [Validators.required]],
    Subject: ['', [Validators.required]],
    Text: ['', [Validators.required]],
    Signature: ['', [Validators.required]],

    positions: this.fb.array([
      this.fb.group({
        positionName: '',
        descriptionAndRequirements: '',
      }),
    ]),
  });

  Templates = statuses;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
