import {Component, OnInit} from '@angular/core';
import {educationalPrograms} from "../../global/constants";
import {ReportService} from "./report.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  programs$ = this.reportService.getPrograms();
  report$ = this.reportService.getReport(1);

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
  }

}
