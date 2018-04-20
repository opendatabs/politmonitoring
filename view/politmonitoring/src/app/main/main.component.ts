import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  @ViewChild('content') content: ElementRef;
  data: any[];
  originalData: any[];

  constructor(
      private dataService: DataService,
      private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
        (data) => {
          data.forEach(d => {
            d.Themenbereich = d.Themenbereich.substring(0, d.Themenbereich.indexOf('(')).trim();
            // TODO dangerous. Maybe we should simplify the property name
            d['Thema 1 (gleiche Nr wie Themenbereich)'] = d['Thema 1 (gleiche Nr wie Themenbereich)']
              .substring(0, d['Thema 1 (gleiche Nr wie Themenbereich)'].indexOf('(')).trim();
            d['Thema 2 (andere Nr)'] = d['Thema 2 (andere Nr)'].substring(0, d['Thema 2 (andere Nr)'].indexOf('(')).trim();
          });
          // Remove empty elements from array
          const filteredData = data.filter( el => el['Geschäfts-nr'] > 0);
          this.data = filteredData;
          this.originalData = filteredData;
          this.modalService.open(this.content, { size: 'lg' });
        },
        (err) => {
          alert('An error occurred. See console for details.');
          console.log(err); // TODO Add error handling
        });
  }

  replaceFilteredData(filteredData: any[]) {
    this.data = filteredData;
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' , windowClass: 'animated slideInUp' });
  }
}
