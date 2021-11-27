import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesService } from '../services/candidates.service';
import { Candidate } from '../../../models/candidate';
import { UpdateCandidateDialogComponent } from '../update-candidate-dialog/update-candidate-dialog.component';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { StaticService } from 'src/app/service/http/static/static.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  // dataSource: any | Candidate[] = [];
  dataSource: any | Candidate[] = new MatTableDataSource();
  filterValues: any = {};
  filterSelectObj: any = [];

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
    private staticService: StaticService
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
        name: 'positionId/Technology',
        columnProp: 'positionId',
        options: [],
      },
      {
        name: 'Email',
        columnProp: 'email',
        options: [],
      },
      {
        name: 'contactSkype',
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
    this.dataSource.sort = this.sort;
  }

  @ViewChild(MatSort) sort!: MatSort;

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

  getCandidates() {
    //need this now to make search component work, should be removed when connected to actual backend
    this.candidatesService.getCandidates().subscribe((candidates) => {
      console.log(candidates);
      this.dataSource.data = candidates;
      this.filterSelectObj.filter((o: any) => {
        o.options = this.getFilterObject(candidates, o.columnProp);
      });
    });
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

  searchList(values: string[]) {
    const [program, statusMark, name, email] = [...values];

    this.dataSource = this.dataSource.filter(
      (item: Candidate) =>
        item.educationProgramId === (program === 'All' ? item.educationProgramId : program) &&
        item.statusMark === (statusMark === 'All' ? item.statusMark : statusMark) &&
        item.email.toLowerCase().includes(email.toLowerCase()) &&
        (item.firstname.toLowerCase().includes(name.toLowerCase()) || item.lastname.toLowerCase().includes(name.toLowerCase()))
    );
  }

  writeFeedback() {
    this.router.navigateByUrl('dashboard/write_feedback').then();
  }

  readFeedback() {
    this.router.navigateByUrl('dashboard/read_feedback').then();
  }

  openDialog(candidate: Candidate): void {
    const data = { ...candidate };
    const dialogRef = this.dialog.open(UpdateCandidateDialogComponent, {
      width: '800px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined && result !== 'cancel') {
        if (JSON.stringify(result) !== JSON.stringify(candidate)) {
          this.candidatesService
            .updateCandidate(result)
            .subscribe(
              (candidate) =>
                (this.dataSource = this.dataSource.map((cand: Candidate) => (candidate.id === cand.id ? { ...candidate } : cand)))
            );
        }
      }
    });
  }
}
