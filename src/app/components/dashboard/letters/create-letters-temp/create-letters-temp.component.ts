import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticService } from 'src/app/service/http/static/static.service';
import { LettersService } from 'src/app/service/http/letters/letters.service';
import { LetterTemplate } from 'src/app/components/shared/interfaces/letters/letter-template.interface';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-create-letters-temp',
  templateUrl: './create-letters-temp.component.html',
  styleUrls: ['./create-letters-temp.component.scss'],
})
export class CreateLettersTempComponent {
  letterTemplateForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    status: ['', Validators.required],
    from: ['no-reply-sandbox@exadel.com'],
    subject: ['', [Validators.maxLength(100), Validators.required]],
    text: ['', [Validators.maxLength(1500), Validators.required]],
    signature: ['', [Validators.maxLength(100), Validators.required]],
  });

  submitted = false;
  statuses: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private staticService: StaticService,
    private lettersService: LettersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    this.staticService.getCandidateStatus().subscribe((data) => {
      const values: string[] = Object.values(data);
      this.statuses = [...values];
    });
  }

  get letterTemplateFormControls() {
    return this.letterTemplateForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.letterTemplateForm.valid) {
      const letterTemplate: LetterTemplate = this.mapFormValuesToLetterTemplateInterface();

      this.lettersService.postLetterTemplate(letterTemplate).subscribe((data: LetterTemplate) =>
        this.router.navigate(['../letters'], { relativeTo: this.route }).then(() => {
          this.toastr.success("Letter's template is created", 'Success');
        })
      );
    }
  }

  mapFormValuesToLetterTemplateInterface() {
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
}
