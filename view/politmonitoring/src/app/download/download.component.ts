import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { trigger, state, animate, transition, style } from '@angular/animations';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
  animations: [
    trigger('visibilityChanged', [
      state('true' , style({ opacity: 1, transform: 'scale(1.0)' })),
      state('false', style({ opacity: 0, transform: 'scale(0.0)' })),
      transition('1 => 0', animate('200ms')),
      transition('0 => 1', animate('400ms'))
    ]),
  ],
})
export class DownloadComponent implements OnInit {

  // TODO: Doublecheck if original data contains all datapoints
  data: object[];
  originalData: object[];
  showDownloadMenu = false;

  constructor(
    private dataService: DataService,
    private elRef: ElementRef,
  ) { }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.data = data);
    this.dataService.originalData.subscribe(originalData => this.originalData = originalData);
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  checkForNoneDropdownClick(event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showDownloadMenu = false;
    }
  }

  onDownloadCsv(): void {
    new Angular5Csv(this.data, this.nameFile(true));
  }

  onDownloadFullCsv(): void {
    new Angular5Csv(this.originalData, this.nameFile());
  }

  onDownloadXlsx(): void {
    // TODO: Check if download original file? --> needs a seperate (non-admin) file
    XLSX.writeFile(
      this.createXlsx(this.data),
      this.nameFile(true) + '.xlsx');
  }

  onDownloadFullXlsx(): void {
    XLSX.writeFile(
      this.createXlsx(this.originalData),
      this.nameFile() + '.xlsx');
  }

  onDownloadPdf(): void {
    console.log('something');
  }

  onDownloadFullPdf(): void {
    console.log('something');
  }

  private nameFile(filtered: boolean = false): string {
    const filterStatus: string = (!filtered ? '' : '_(gefiltert)');
    const timestamp: string = moment().format('DD/MM/YYYY');
    return `Grossratsgeschäfte_Basel_Stadt_${timestamp}${filterStatus}`;
  }

  private createXlsx(data: object[]): XLSX.WorkBook {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
     // add the worksheet to the workbook, name the tab
    XLSX.utils.book_append_sheet(wb, ws, 'Grossratsgeschäfte');
    return wb;
  }
}
