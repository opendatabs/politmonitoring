import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { DataService } from '../shared/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  data: any[];
  originalData: any[];
  categoryFilter: String;
  @ViewChild('content') content: ElementRef;
  firstDisplay: boolean = true;

  constructor(
      private dataService: DataService,
      private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
        (data) => {
          data.forEach(d => {

            // extract numbers of categories
            d.Themenbereich_Number = DataService.extractNumber(d.Themenbereich);
            d.Thema2_Number = DataService.extractNumber(d['Thema 2 (andere Nr)']);

            // remove number
            d.Themenbereich = d.Themenbereich.substring(0, d.Themenbereich.indexOf('(')).trim();
            d["Themenbereich Thema 2"] = d["Themenbereich Thema 2"].substring(0, d["Themenbereich Thema 2"].indexOf('(')).trim();
            // TODO dangerous. Maybe we should simplify the property name
            d['Thema 1 (gleiche Nr wie Themenbereich)'] = d['Thema 1 (gleiche Nr wie Themenbereich)']
              .substring(0, d['Thema 1 (gleiche Nr wie Themenbereich)'].indexOf('(')).trim();
            d['Thema 2 (andere Nr)'] = d['Thema 2 (andere Nr)'].substring(0, d['Thema 2 (andere Nr)'].indexOf('(')).trim();
          });
          // Remove empty elements from array
          const filteredData = data.filter( el => el['Geschäfts-nr'] > 0);
          this.data = filteredData;
          this.originalData = filteredData;
        },
        (err) => {
          alert('An error occurred. See console for details.');
          console.log(err); // TODO Add error handling
        });
  }
  // ngAfterViewInit(): void {
  //   if (this.firstDisplay) {
  //     this.modalService.open(this.content, {size: 'lg'});
  //     this.firstDisplay = false;
  //   }
  // }

  /*
  * Retruns true if used browser is of type IE 11, 10 or older
  */
  detectIE(): boolean {
    const ua = window.navigator.userAgent;
    return ua.indexOf('Trident/') > 0 || ua.indexOf('MSIE ') > 0;
  }

  replaceFilteredData(value: any) {
    this.data = value.data;
    this.categoryFilter = value.categoryFilter;
  }
  /*
  * Triggers the modal to apear. Modaloption can be passed as arguments
  * See: https://ng-bootstrap.github.io/#/components/modal/examples
  */
  openLg(content) {
    this.modalService.open(content, { size: 'lg' , windowClass: 'animated slideInUp' });
  }
}
