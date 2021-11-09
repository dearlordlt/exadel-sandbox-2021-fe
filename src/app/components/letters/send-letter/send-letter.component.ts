import { Component, OnInit } from '@angular/core';
import { statuses } from 'src/app/global/constants';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Candidate } from '../../models/candidate';

import { ValidateStringOfEmails } from '../../shared/validators/string-of-emails.validator';

@Component({
  selector: 'app-send-letter',
  templateUrl: './send-letter.component.html',
  styleUrls: ['./send-letter.component.scss'],
})
export class SendLetterComponent implements OnInit {
  letterForm: FormGroup = this.fb.group({
    sendFrom: [{ value: 'no-reply.sandbox@exadel.com', disabled: true }, [Validators.required, Validators.email]],
    sendTo: ['', [Validators.required, ValidateStringOfEmails]],
    Subject: ['', [Validators.required]],
    Text: ['', [Validators.required]],
    Signature: ['', [Validators.required]],
  });

  Templates = statuses;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  getSearchedCandidatesEmails(searchedCandidates: Candidate[]): void {
    const emails: string[] = searchedCandidates.map((item) => item.email);
    this.letterForm.controls['sendTo'].setValue(emails.join(', '));
  }

  onSubmit(): void {}
}
