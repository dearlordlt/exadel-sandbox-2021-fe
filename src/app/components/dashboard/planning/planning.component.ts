import {Component, OnInit} from '@angular/core';
import {EducationalProgramsService} from '../../../service/http/educational-programs/educational-programs.service';
import {EducationalProgram} from '../../shared/interfaces/educational-program/educational-program.interface';
import * as moment from 'moment';
import 'moment-timezone';
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  displayedColumns: string[] = ['name', 'applicationAcceptancePeriod', 'educationalProgramsPeriod', 'calendar'];
  dataSource: EducationalProgram[] = [];

  eduProgramName: FormControl = new FormControl('');
  accepPerFrom: FormControl = new FormControl('');
  progPerFrom: FormControl = new FormControl('');

  constructor(private educationalProgramsService: EducationalProgramsService, private router: Router,
              private route: ActivatedRoute,) {
  }

  buildNameTerm(term: string): void {
    this.router.navigate([], {
      queryParamsHandling: "merge",
      queryParams: {name: term}
    }).then();

    this.route.queryParams.pipe(
      map(query => query.name || ''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.educationalProgramsService.getEducationalPrograms(term, this.accepPerFrom.value, this.progPerFrom.value)),
    ).subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)))
  }

  buildAccepDateTerm(term: string): void {
    this.router.navigate([], {
      queryParamsHandling: "merge",
      queryParams: {accep_per_from: term}
    }).then();

    this.route.queryParams.pipe(
      map(query => query.accep_per_from || ''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.educationalProgramsService.getEducationalPrograms(this.eduProgramName.value, term, this.progPerFrom.value)),
    ).subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)))
  }

  buildProgDateTerm(term: string): void {
    this.router.navigate([], {
      queryParamsHandling: "merge",
      queryParams: {prog_per_from: term}
    }).then();

    this.route.queryParams.pipe(
      map(query => query.prog_per_from || ''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.educationalProgramsService.getEducationalPrograms(this.eduProgramName.value, this.accepPerFrom.value, term)),
    ).subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)))
  }

  ngOnInit(): void {
    this.fetchEducationalPrograms();
  }

  fetchEducationalPrograms(): void {
    this.educationalProgramsService
      .getEducationalPrograms()
      .subscribe((data: EducationalProgram[]) => (this.dataSource = this.trimTimeFromDate(data)));
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
}
