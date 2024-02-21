import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-excel',
  templateUrl: './report-excel.component.html',
  styleUrls: ['./report-excel.component.css'],
})
export class ReportExcelComponent {
  listProfiles: any[] = [];

  @Input() data: any[] = [];
  @Input() headers: string[] = [];
  @Input() fileName: string = 'data.xlsx';

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  generateExcel(data: any[], headers: string[], fileName: string): void {
    const currentDate = new Date();
    const nowDate =
      this.datePipe.transform(currentDate, 'ddMMyyyy_HHmmss') || '';
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, nowDate + fileName);
  }
}
