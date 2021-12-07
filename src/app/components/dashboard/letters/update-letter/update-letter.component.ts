import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LetterTemplate } from 'src/app/components/shared/interfaces/letters/letter-template.interface';
import { LettersService } from 'src/app/service/http/letters/letters.service';
import { StaticService } from 'src/app/service/http/static/static.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/confirmation-dialog/confirmation-dialog.component';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-update-letter',
  templateUrl: './update-letter.component.html',
  styleUrls: ['./update-letter.component.scss'],
})
export class UpdateLetterComponent implements OnInit {
  letterTemplateForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    status: ['', Validators.required],
    from: ['no-reply-sandbox@exadel.com'],
    subject: ['', [Validators.maxLength(100), Validators.required]],
    text: ['', [Validators.maxLength(1500), Validators.required]],
    signature: ['', [Validators.maxLength(100), Validators.required]],
  });

  letterTemplateId: string = '';
  letterTemplate: LetterTemplate = {} as LetterTemplate;
  statuses: string[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private staticService: StaticService,
    private lettersService: LettersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.letterTemplateId = this.route.snapshot.paramMap.get('lettersTemplateId')!;
    if (this.letterTemplateId) {
      this.lettersService.getLetterTemplate(this.letterTemplateId).subscribe((data: LetterTemplate) => {
        this.letterTemplate = data;
        this.initializeFormWithLetterTemplateData();
      });
    }

    this.getStatuses();
  }

  initializeFormWithLetterTemplateData(): void {
    this.letterTemplateForm.setValue({
      name: this.letterTemplate.name,
      status: this.letterTemplate.candidateStatusId,
      from: this.letterTemplate.from,
      subject: this.letterTemplate.subject,
      text: this.letterTemplate.templText,
      signature: this.letterTemplate.letterSignature,
    });
  }

  getStatuses(): void {
    this.staticService.getCandidateStatus().subscribe((data) => {
      const values: string[] = Object.values(data);
      this.statuses = [...values];
    });
  }

  get letterTemplateFormControls() {
    return this.letterTemplateForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.letterTemplateForm.valid) {
      const letterTemplate: LetterTemplate = this.mapFormValuesToLetterTemplateInterface();

      this.lettersService.updateLetterTemplate(this.letterTemplateId, letterTemplate).subscribe((data: LetterTemplate) =>
        this.router.navigate(['dashboard/letters']).then(() => {
          this.toastr.success("Letter's template is updated", 'Success');
        })
      );
    }
  }

  mapFormValuesToLetterTemplateInterface(): LetterTemplate {
    const letterTemplate: LetterTemplate = {
      name: this.letterTemplateForm.get('name')!.value,
      subject: this.letterTemplateForm.get('subject')!.value,
      from: this.letterTemplateForm.get('from')!.value,
      templText: this.letterTemplateForm.get('text')!.value,
      candidateStatusId: this.letterTemplateForm.get('status')!.value,
      letterSignature: this.letterTemplateForm.get('signature')!.value,
      addDateTime: moment(new Date()).format(moment.HTML5_FMT.DATE),
    };

    return letterTemplate;
  }

  deleteLetterTemplate(): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete this letter template?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No',
        },
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.lettersService.deleteLetterTemplate(this.letterTemplateId).subscribe((data: LetterTemplate) =>
          this.router.navigate(['dashboard/letters']).then(() => {
            this.toastr.success("Letter's template was deleted", 'Success');
          })
        );
      }
    });
  }
}
