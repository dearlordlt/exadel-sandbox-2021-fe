import { Component, OnInit } from '@angular/core';
import { ReportService } from './report.service';
import { filter, map, tap } from 'rxjs/operators';
import { Chart } from 'angular-highcharts';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  programs$ = this.reportService.getPrograms();
  report$ = this.reportService.getReport(1);
  fileName = 'Report.xlsx';
  reportArrOptions: string[] = ['Applications',
    'Refusal by the level of English',
    'Refusal by location',
    'Failure on the technical level',
    'Candidate\'s refusal',
    'Sandbox completed'];
  reportArrValues: number[] = [];
  name = 'NaN';
  chart!: Chart;

  constructor(private reportService: ReportService) {
  }

  ngOnInit() {
    this.init();
  }

  createReport(id: number) {
    this.reportService.getReport(id).pipe(tap(r => {
      this.reportArrValues = Object.values(r[0]);
    })).subscribe();
    this.reportService.getPrograms().pipe(tap(p => {
      this.name = p[id - 1].name;
    })).subscribe();
    this.report$ = this.reportService.getReport(id);
  }

  init() {
    const chart = new Chart({
      chart: {
        type: 'bar',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: '',
      },
      yAxis: {
        visible: true,
      },
      legend: {
        enabled: true,
      },
      xAxis: {
        lineColor: '#fff',
        categories: this.reportArrOptions,
      },
      plotOptions: {
        series: {
          borderRadius: 5,
        } as any,
      },
      series: [
        {
          type: 'bar',
          color: '#72b5e9',
          name: this.name,
          data: [
            { y: this.reportArrValues[0] },
            { y: this.reportArrValues[1] },
            { y: this.reportArrValues[2] },
            { y: this.reportArrValues[3] },
            { y: this.reportArrValues[4] },
            { y: this.reportArrValues[5] },
          ],
        },
      ],
    });
    this.chart = chart;
    chart.ref$.subscribe();
  }

  exportExcel(): void {
    if (this.name != 'NaN') {
      const element = document.getElementById('excel-table');
      const ws = XLSX.utils.table_to_sheet(element);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, this.fileName);
    }
  }

}
