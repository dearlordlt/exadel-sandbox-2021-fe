import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LetterTemplate} from '../../shared/interfaces/letters/letter-template.interface';
import {LettersService} from 'src/app/service/http/letters/letters.service';
import * as moment from 'moment';
import 'moment-timezone';
import {AuthenticationService} from 'src/app/service/authentication/authentication.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss'],
})
export class LettersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'dateOfUpdate', 'edit'];
  dataSource: any | LetterTemplate[] = new MatTableDataSource();
  filterValues: any = {};
  filterSelectObj: any = [];
  userAdmin = true;

  sortOrder: any = {
    column: 1,
    order: 2,
  };

  constructor(private router: Router, private letterService: LettersService, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.filterSelectObj = [
      {
        name: 'Template',
        columnProp: 'name',
        options: [],
      },
      {
        name: 'Last Updated',
        columnProp: 'addDateTime',
        options: [],
      }
    ]
  }

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getLetterTemplates();
    this.getUser();
    this.dataSource.filterPredicate = this.createFilter();

  }

  getUser() {
    this.authenticationService.getEmployee(localStorage.getItem('id') || '').subscribe((data) => {
      if (data.empPosition !== 'Administrator') {
        this.userAdmin = false;
      }
    });
  }

  getLetterTemplates(): void {
    this.letterService.getLetterTemplates().subscribe((data: LetterTemplate[]) => {
      // this.dataSource = this.trimTimeFromDate(data)
      this.dataSource.data = this.trimTimeFromDate(data);
      this.filterSelectObj.filter((o: any) => {
        o.options = this.getFilterObject(data, o.columnProp);
      });
    });

  }

  trimTimeFromDate(letterTemplates: LetterTemplate[]): LetterTemplate[] {
    // Trim the time part from date and replaces dashes with dots
    letterTemplates.forEach((letterTemplate) => {
      letterTemplate.addDateTime = moment(letterTemplate.addDateTime).format(moment.HTML5_FMT.DATE).split('-').join('.');
    });

    return letterTemplates;
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

// Called on Filter change
  filterChange(filter: any, event: any) {
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
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
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
    this.filterSelectObj.forEach((value: any, key: any) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }

  sortData(sort: Sort) {
    this.sortOrder.column = sort.active == "name" ? this.sortOrder.column = 1 : 2;
    this.sortOrder.order = sort.direction == "asc" ? this.sortOrder.order = 1 : 2;

    this.router
      .navigate([], {
        queryParamsHandling: 'merge',
        queryParams: {column: this.sortOrder.column, order: this.sortOrder.order},
      })
      .then();

    this.route.queryParams
      .pipe(
        map((query) => query.order || ''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((order: number) =>
          this.letterService.getLetterSorted(
            this.sortOrder.column,
            order
          )
        )
      )
      .subscribe((data: LetterTemplate[]) => (this.dataSource = this.trimTimeFromDate(data)));
  }

  gotoUpdate() {
    this.router.navigate(['/', 'update-letter']);
  }
}
