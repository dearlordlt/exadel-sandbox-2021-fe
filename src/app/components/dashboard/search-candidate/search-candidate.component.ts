import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-search-candidate',
  templateUrl: './search-candidate.component.html',
  styleUrls: ['./search-candidate.component.scss']
})
export class SearchCandidateComponent implements OnInit {
  searchControl: FormControl = new FormControl('')

  constructor() {
  }

  ngOnInit(): void {
  }

}
