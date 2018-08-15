import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { trigger, state, animate, transition, style } from '@angular/animations';

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

  data: object[];
  originalData: object[];
  showDownloadMenu = false;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.dataService.data.subscribe(data => this.data = data);
    this.dataService.originalData.subscribe(originalData => this.originalData = originalData);
  }

  onDownloadFullCsv(): void {
    new Angular5Csv(this.data, 'Title?!');
  }

  onDownloadCsv(): void {
    new Angular5Csv(this.originalData, 'Title?!');
  }
}
