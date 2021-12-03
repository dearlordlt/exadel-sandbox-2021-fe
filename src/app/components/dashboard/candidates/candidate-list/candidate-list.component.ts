import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesService } from '../services/candidates.service';
import { Candidate } from '../../../models/candidate';
import { UpdateCandidateDialogComponent } from '../update-candidate-dialog/update-candidate-dialog.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { StaticService } from 'src/app/service/http/static/static.service';
import { EducationalProgramsService } from 'src/app/service/http/educational-programs/educational-programs.service';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { FeedbackService } from '../../../../service/http/candidate-list/feedback/feedback.service';

import * as moment from 'moment';
import 'moment-timezone';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit, AfterViewInit {
  // dataSource: any | Candidate[] = [];
  dataSource: any | Candidate[] = new MatTableDataSource();
  empoloyeeRole!: string;
  filterValues: any = {};
  filterSelectObj: any = [];
  programsList: { id: string; name: string }[] = [];
  positionsList: { id: string; name: string }[] = [];
  statusesList!: { [id: string]: string };
  updateOption = false;
  updateDialogWidth = '800px';

  displayedColumns: string[] = [
    'edit',
    'firstname',
    'lastname',
    'educationProgramId',
    'positionId',
    'email',
    'contactSkype',
    'contactPhone',
    'country',
    'city',
    'englishLevel',
    'contactTime',
    'planToJoinExadel',
    'postDateTimeNow',
    'statusMark',
    'softSkillLevel',
    'hardSkillLevel',
    'mentorsMark',
    'interViewerMark',
  ];

  showDelay = 1000;

  constructor(
    private candidatesService: CandidatesService,
    private router: Router,
    public dialog: MatDialog,
    private staticService: StaticService,
    private educationalProgramsService: EducationalProgramsService,
    private authenticationService: AuthenticationService,
    private feedbackService: FeedbackService
  ) {
    this.filterSelectObj = [
      {
        name: 'First name',
        columnProp: 'firstname',
        options: [],
      },
      {
        name: 'Second name',
        columnProp: 'lastname',
        options: [],
      },
      {
        name: 'Educational Programs',
        columnProp: 'educationProgramId',
        options: [],
      },
      {
        name: 'Position/Technology',
        columnProp: 'positionId',
        options: [],
      },
      {
        name: 'Email',
        columnProp: 'email',
        options: [],
      },
      {
        name: 'Skype',
        columnProp: 'contactSkype',
        options: [],
      },
      {
        name: 'Phone',
        columnProp: 'contactPhone',
        options: [],
      },
      {
        name: 'Country',
        columnProp: 'country',
        options: [],
      },
      {
        name: 'City',
        columnProp: 'city',
        options: [],
      },
      {
        name: 'English Level',
        columnProp: 'englishLevel',
        options: [],
      },
      {
        name: 'Time to Contact',
        columnProp: 'contactTime',
        options: [],
      },
      {
        name: 'Plan To Join',
        columnProp: 'planToJoinExadel',
        options: [],
      },
      {
        name: 'Date of Applying',
        columnProp: 'postDateTimeNow',
        options: [],
      },
      {
        name: 'Status',
        columnProp: 'statusMark',
        options: [],
      },
      {
        name: 'Soft Skill',
        columnProp: 'softSkillLevel',
        options: [],
      },
      {
        name: 'Hard Skill',
        columnProp: 'hardSkillLevel',
        options: [],
      },
      {
        name: "Mentor's Mark",
        columnProp: 'mentorsMark',
        options: [],
      },
      {
        name: "Interviewer's Mark after Sandbox",
        columnProp: 'interViewerMark',
        options: [],
      },
    ];
  }

  ngOnInit(): void {
    this.getCandidates();
    this.dataSource.filterPredicate = this.createFilter();
    this.fillProgramsList();
    this.fillPositionsList();
    this.fillStatusesList();
    this.getEmployeeRole();
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getFilterObject(fullObj: any, key: any) {
    const uniqChk: any = [];
    fullObj.filter((obj: any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });

    return uniqChk;
  }

  getEmployeeRole() {
    this.authenticationService.getEmployee(localStorage.getItem('id') || '').subscribe((data) => {
      const role = data.role.roleName;
      if (role === 'Administrator' || role === 'Manager' || role === 'Recruiter') {
        this.updateOption = true;
        if (role === 'Manager') {
          this.updateDialogWidth = '400px';
        }
      }
      this.empoloyeeRole = data.role.roleName;
    });
  }

  getCandidates() {
    this.candidatesService.getCandidates().subscribe((candidates) => {
      this.dataSource.data = candidates;
      this.filterSelectObj.filter((o: any) => {
        o.options = this.getFilterObject(candidates, o.columnProp);
      });
    });
  }

  fillProgramsList() {
    this.educationalProgramsService.getEducationalPrograms().subscribe((programs) => {
      programs.forEach((program) => {
        this.programsList.push({ id: program.id!, name: program.name });
      });
    });
  }

  fillPositionsList() {
    this.educationalProgramsService.getPositions().subscribe((positions) => {
      positions.forEach((position) => {
        this.positionsList.push({ id: position.id!, name: position.name });
      });
    });
  }

  fillStatusesList() {
    this.staticService.getCandidateStatus().subscribe((data) => {
      this.statusesList = data;
    });
  }

  showProgramName(id: string) {
    for (const program of this.programsList) {
      if (id === program.id) {
        return program.name;
      }
    }
    return id;
  }

  showPositionName(id: string) {
    for (const position of this.positionsList) {
      if (id === position.id) {
        return position.name;
      }
    }
    return id;
  }

  showStatusName(id: string) {
    if (this.statusesList) {
      return this.statusesList[id];
    }
    return id;
  }

  showTime(time: Date) {
    return moment(time).format(moment.HTML5_FMT.DATE).split('-').join('.');
  }

  filterChange(filter: any, event: any) {
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  createFilter() {
    const filterFunction = function (data: any, filter: string): boolean {
      const searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      const nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col]
              .trim()
              .toLowerCase()
              .split(' ')
              .forEach((word: any) => {
                if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                  found = true;
                }
              });
          }
          return found;
        } else {
          return true;
        }
      };
      return nameSearch();
    };
    return filterFunction;
  }

  resetFilters() {
    this.filterValues = {};
    this.filterSelectObj.forEach((value: any, key: any) => {
      value.modelValue = undefined;
    });
    this.dataSource.filter = '';
  }

  searchList(data: Candidate[]) {
    this.dataSource.data = data;

    // this.filterSelectObj.filter((o: any) => {
    //   o.options = this.getFilterObject(data, o.columnProp);
    // });
  }

  rwFeedback(id: string, name: string, lastname: string) {
    this.feedbackService.candidateId = id;
    this.feedbackService.candidateName = name + ' ' + lastname;
    this.feedbackService
      .getEmployeeById(localStorage.getItem('id')!)
      .pipe(
        tap((emp) => {
          if (emp.role.roleName == 'Recruiter' || emp.role.roleName == 'Interviewer' || emp.role.roleName == 'Mentor') {
            this.router.navigateByUrl('dashboard/write_feedback').then();
          } else if (emp.role.roleName == 'Administrator' || emp.role.roleName == 'Manager') {
            this.router.navigateByUrl('dashboard/read_feedback').then();
          }
        })
      )
      .subscribe();
  }

  openDialog(candidate: Candidate): void {
    const candidateData = { ...candidate };
    const dialogRef = this.dialog.open(UpdateCandidateDialogComponent, {
      width: this.updateDialogWidth,
      data: { candidate: candidateData, role: this.empoloyeeRole },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== 'cancel') {
        if (JSON.stringify(result.candidate) !== JSON.stringify(candidate)) {
          if (this.empoloyeeRole === 'Manager') {
            this.candidatesService.updateCandidatesStatus(result.candidate).subscribe(() => {
              this.getCandidates();
            });
          } else {
            this.candidatesService.updateCandidate(result.candidate).subscribe(() => {
              this.getCandidates();
            });
          }
        }
      }
    });
  }
}
