import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LetterTemplate } from '../../shared/interfaces/letters/letter-template.interface';
import { LettersService } from 'src/app/service/http/letters/letters.service';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss'],
})
export class LettersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateOfUpdate', 'edit'];
  dataSource: LetterTemplate[] = [];

  constructor(private router: Router, private letterService: LettersService) {}

  ngOnInit(): void {
    this.getLetterTemplates();
  }

  getLetterTemplates(): void {
    this.letterService.getLetterTemplates().subscribe((data: LetterTemplate[]) => (this.dataSource = this.trimTimeFromDate(data)));
  }

  trimTimeFromDate(letterTemplates: LetterTemplate[]): LetterTemplate[] {
    // Trim the time part from date and replaces dashes with dots
    letterTemplates.forEach((letterTemplate) => {
      letterTemplate.addDateTime = moment(letterTemplate.addDateTime).format(moment.HTML5_FMT.DATE).split('-').join('.');
    });

    return letterTemplates;
  }

  gotoUpdate() {
    this.router.navigate(['/', 'update-letter']);
  }
}
