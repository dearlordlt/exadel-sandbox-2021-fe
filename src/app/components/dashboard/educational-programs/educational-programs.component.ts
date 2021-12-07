import { Component, OnInit } from '@angular/core';
import { EducationalProgramsService } from '../../../service/http/educational-programs/educational-programs.service';
import { EducationalProgram } from '../../shared/interfaces/educational-program/educational-program.interface';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { SortEducationalProgram } from '../../shared/interfaces/educational-program/sort-edu-program.interface';
import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-educational-programs',
  templateUrl: './educational-programs.component.html',
  styleUrls: ['./educational-programs.component.scss'],
})
export class EducationalProgramsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'appAcceptFrom', 'eduProgFrom', 'edit'];
  dataSource: EducationalProgram[] = [];
  eduProgramName: FormControl = new FormControl('');
  accepPerFrom: FormControl = new FormControl('');
  progPerFrom: FormControl = new FormControl('');
  sortOrder: SortEducationalProgram = {
    sort_col: 'appAcceptFrom',
    sort_by: 'desc',
  };

  constructor(private educationalProgramsService: EducationalProgramsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get educational programs sorted by the value specified by the setOrder object
    this.buildAccepDateTerm('');
  }

  trimTimeFromDate(educationalPrograms: EducationalProgram[]): EducationalProgram[] {
    // Trim the time part from date and replaces dashes with dots
    educationalPrograms.forEach((educationalProgram) => {
      educationalProgram.appAcceptFrom = moment(educationalProgram.appAcceptFrom).format(moment.HTML5_FMT.DATE).split('-').join('.');
      educationalProgram.appAcceptTo = moment(educationalProgram.appAcceptTo).format(moment.HTML5_FMT.DATE).split('-').join('.');
      educationalProgram.eduProgFrom = moment(educationalProgram.eduProgFrom).format(moment.HTML5_FMT.DATE).split('-').join('.');
      educationalProgram.eduProgTo = moment(educationalProgram.eduProgTo).format(moment.HTML5_FMT.DATE).split('-').join('.');
    });

    return educationalPrograms;
  }

  buildNameTerm(term: string): void {
    this.router
      .navigate([], {
        queryParamsHandling: 'merge',
        queryParams: { name: term },
      })
      .then();

    this.route.queryParams
      .pipe(
        map((query) => query.name || ''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.educationalProgramsService.getEducationalPrograms(
            term,
            this.accepPerFrom.value,
            this.progPerFrom.value,
            this.sortOrder.sort_col,
            this.sortOrder.sort_by
          )
        )
      )
      .subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)));
  }

  buildAccepDateTerm(term: string): void {
    this.router
      .navigate([], {
        queryParamsHandling: 'merge',
        queryParams: { accep_per_from: term },
      })
      .then();

    this.route.queryParams
      .pipe(
        map((query) => query.accep_per_from || ''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.educationalProgramsService.getEducationalPrograms(
            this.eduProgramName.value,
            term,
            this.progPerFrom.value,
            this.sortOrder.sort_col,
            this.sortOrder.sort_by
          )
        )
      )
      .subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)));
  }

  buildProgDateTerm(term: string): void {
    this.router
      .navigate([], {
        queryParamsHandling: 'merge',
        queryParams: { prog_per_from: term },
      })
      .then();

    this.route.queryParams
      .pipe(
        map((query) => query.prog_per_from || ''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.educationalProgramsService.getEducationalPrograms(
            this.eduProgramName.value,
            this.accepPerFrom.value,
            term,
            this.sortOrder.sort_col,
            this.sortOrder.sort_by
          )
        )
      )
      .subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)));
  }

  sortData(sort: Sort) {
    this.sortOrder.sort_col = sort.active;
    this.sortOrder.sort_by = sort.direction;

    this.router
      .navigate([], {
        queryParamsHandling: 'merge',
        queryParams: { sort_col: this.sortOrder.sort_col, sort_by: this.sortOrder.sort_by },
      })
      .then();

    this.route.queryParams
      .pipe(
        map((query) => query.sort_by || ''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((sort_by: string) =>
          this.educationalProgramsService.getEducationalPrograms(
            this.eduProgramName.value,
            this.accepPerFrom.value,
            this.progPerFrom.value,
            this.sortOrder.sort_col,
            sort_by
          )
        )
      )
      .subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)));
  }
}
