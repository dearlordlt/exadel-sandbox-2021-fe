import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Candidate } from '../../../models/candidate';
import { ValidateStringOfEmails } from '../../shared/validators/string-of-emails.validator';
import { LetterTemplate } from 'src/app/components/shared/interfaces/letters/letter-template.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LettersService } from 'src/app/service/http/letters/letters.service';
import { Letter } from 'src/app/components/shared/interfaces/letters/letter.interface';

@Component({
  selector: 'app-send-letter',
  templateUrl: './send-letter.component.html',
  styleUrls: ['./send-letter.component.scss'],
})
export class SendLetterComponent implements OnInit {
  letterForm: FormGroup = this.fb.group({
    sendFrom: [{ value: 'no-reply.sandbox@exadel.com', disabled: true }, [Validators.required, Validators.email]],
    sendTo: ['', [Validators.required, ValidateStringOfEmails]],
    subject: ['', [Validators.required]],
    text: ['', [Validators.required]],
    signature: ['', [Validators.required]],
  });

  letterTemplates: LetterTemplate[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private letterService: LettersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getLetterTemplates();
  }

  getLetterTemplates(): void {
    this.letterService.getLetterTemplates().subscribe((data: LetterTemplate[]) => {
      this.letterTemplates = data;
      // Adding a blank letter template so user could unselect a real letter template
      this.letterTemplates.unshift({
        id: '',
        name: 'Blank',
        subject: '',
        from: '',
        templText: '',
        candidateStatusId: 0,
        letterSignature: '',
        addDateTime: '',
      } as LetterTemplate);
    });
  }

  onLetterTemplateChange(letterTemplate: LetterTemplate): void {
    // Fill reactive form with the chosen letter template
    this.letterForm.patchValue({
      sendFrom: letterTemplate.from,
      subject: letterTemplate.subject,
      text: letterTemplate.templText,
      signature: letterTemplate.letterSignature,
    });
  }

  getSearchedCandidatesEmails(searchedCandidates: Candidate[]): void {
    const emails: string[] = searchedCandidates.map((item) => item.email);
    this.letterForm.controls['sendTo'].setValue(emails.join(', '));
  }

  onSubmit(): void {
    if (this.letterForm.valid) {
      const letter: Letter = this.mapFormValuesToLetterInterface();
      this.letterService.sendLetter(letter).subscribe((data: Letter) =>
        this.router.navigate(['../educational-programs'], { relativeTo: this.route }).then(() => {
          this.toastr.success('Letter was sent', 'Success');
        })
      );
    }
  }

  mapFormValuesToLetterInterface(): Letter {
    const letter: Letter = {
      to: this.letterForm.get('sendTo')!.value,
      subject: this.letterForm.get('subject')!.value,
      body: this.letterForm.get('text')!.value + '\n\n' + this.letterForm.get('signature')!.value,
    };

    return letter;
  }
}
