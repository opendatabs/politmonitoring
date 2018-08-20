import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { trigger, state, animate, transition, style } from '@angular/animations';
import * as moment from 'moment';

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

  nameFile(filtered: boolean = false): string {
    const filterStatus: string = (filtered ? '' : '_(gefiltert)');
    const timestamp: string = moment().format('DD/MM/YYYY');
    return `Grossratsgeschäfte_Basel_Stadt_${timestamp}${filterStatus}`;
  }

  onDownloadFullCsv(): void {
    new Angular5Csv(this.data, this.nameFile());
  }

  onDownloadCsv(): void {
    new Angular5Csv(this.originalData, this.nameFile(true));
  }

  onDownloadXlsx(): void {
    console.log(this.nameFile());
  }

  onDownloadFullXlsx(): void {
    console.log(this.nameFile(true));
  }

  onDownloadPdf(): void {
    console.log('something');
  }

  onDownloadFullPdf(): void {
    console.log('something');
  }
}
