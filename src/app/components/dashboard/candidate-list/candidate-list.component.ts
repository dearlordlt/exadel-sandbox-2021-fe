import { Component, OnInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { CandidatesService } from './services/candidates.service';
import { Candidate } from '../../models/candidate';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent implements OnInit {
  filterValues:any = {};
  candidates: Candidate[] = [];
  // EPFormControl: FormControl = new FormControl('All');
  dataSource = new MatTableDataSource();
  filterSelectObj: any = [];

  // educationalPrograms: Array<string> =['All'];


  // getcandidates$ = this.candidatesService.filteredByEduPrograms('')
  displayedColumns: string[] = [
    'edit',
    'firstname',
    'lastname',
    'eduProg',
    'position',
    'email',
    'phone_number',
    'country',
    'english_level',
    'contact_time',
    'plan_to_join',
    'date_of_apply',
    'status',
    'soft_skill',
    'hard_skill',
    'mentor_mark',
    'interviewer_mark',
  ];

  constructor(private candidatesService: CandidatesService) {
    this.filterSelectObj = [
      {
        name: 'Educational Programs',
        columnProp: 'eduProg',
        options: []
      }, {
        name: 'Position/Technology',
        columnProp: 'position',
        options: []
      },
      {
        name: 'English Level',
        columnProp: 'english_level',
        options: []
      },
      {
        name: 'Time to Contact',
        columnProp: 'contact_time',
        options: []
      },
      {
        name: 'Plan To Join',
        columnProp: 'plan_to_join',
        options: []
      },
      {
        name: 'Status',
        columnProp: 'status',
        options: []
      },
      {
        name: 'Soft Skill',
        columnProp: 'soft_skill',
        options: []
      },
      {
        name: 'Hard Skill',
        columnProp: 'hard_skill',
        options: []
      },
      {
        name: 'Mentor\'s Mark',
        columnProp: 'mentor_mark',
        options: []
      },
      {
        name: 'Interviewer\'s Mark after Sandbox',
        columnProp: 'interviewer_mark',
        options: []
      }


    ]

  }

  ngOnInit(): void {
    this.getCandidates();
    this.dataSource.filterPredicate = this.createFilter();

  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj: any, key:any) {
    const uniqChk:any = [];
    fullObj.filter((obj:any) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });

    return uniqChk;
  }

  getCandidates() {
    this.candidatesService.getCandidates().subscribe((candidates) => {
      this.candidates = candidates;
      console.log(this.candidates)

      this.dataSource.data = this.candidates;

      this.filterSelectObj.filter((o:any) => {
        o.options = this.getFilterObject( this.candidates, o.columnProp);
      });
    });




  }


  // Called on Filter change
  filterChange(filter:any, event:any) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Custom filter method fot Angular Material Datatable
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
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word:any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }
    return filterFunction
  }


  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value:any, key:any) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }



}
