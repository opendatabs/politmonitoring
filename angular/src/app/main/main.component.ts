import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, AfterViewInit {
  data: any[];
  originalData: any[];
  categoryFilter: String;
  @ViewChild('infoBtnContent', { static: true }) infoBtnContent: ElementRef;
  firstDisplay = true; // true: display modal on first page load

  constructor(
    private dataService: DataService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {

    // maps new data from API to structure of old data, so we don't have to change everything
    this.dataService.getDataNew().subscribe(
      d => {
        const data = d['records'].map(elem => elem.fields);
        data.forEach(fields => {
          fields['Instrument'] = fields['geschaftstyp'] ? fields['geschaftstyp'] : '';
          fields['Partei'] = fields['partei'] ? fields['partei'] : 'Parteilos';
          fields['Link'] = fields['geschaft'] ? fields['geschaft'] : '';
          fields['Geschäfts-nr'] = fields['signatur'] ? fields['signatur'] : '';
          fields['Status'] = fields['status'] ? this.parseStatus(fields['status']) : '';
          fields['Thema 1'] = fields['thema_1'] ? fields['thema_1'] : '';
          fields['Thema 2'] = fields['thema_2'] ? fields['thema_2'] : '';
          fields['Titel'] = fields['titel'] ? fields['titel'] : '';
          fields['UrheberIn'] = fields['urheber'] ? fields['urheber'] : '';
          fields['Beginn-Datum'] = fields['beginn_datum'] ? fields['beginn_datum'] : '';
          fields['Schwerpunktthema (bei Bedarf)'] = fields['schwerpunkt'] ? fields['schwerpunkt'] : '';
          fields['Jahr'] = (new Date(fields['beginn_datum'])).getFullYear().toString();
          fields['Themenbereich 1'] = this.dataService.getCategoryForSubCategory(fields['thema_1']) ?
            this.dataService.getCategoryForSubCategory(fields['thema_1']) :
            this.dataService.getCategoryForSubCategory(fields['thema_2']); // if there is no themenbereich 1, we take themenbereich 2
          fields['Themenbereich 2'] = this.dataService.getCategoryForSubCategory(fields['thema_2']) ?
            this.dataService.getCategoryForSubCategory(fields['thema_2']) :
            '';
        });
        //console.log(data);
        this.data = data;
        this.originalData = data;
      }
    )

  }

  ngAfterViewInit(): void {
    if (this.firstDisplay) {
      // Has to be done async (not in same digest) to avoid expressionChangedAfterItHasBeenCheckedError
      setTimeout(() => {
       this.modalService.open(this.infoBtnContent, { size: 'lg' });
        this.firstDisplay = false; // Only display modal on first load
      }, 0);
    }
  }

  /**
   * Check if the user is using Internet Explorer
   *
   * @returns {boolean} used browser is of type IE 11, 10 or older
   * @memberof MainComponent
   */
  detectIE(): boolean {
    const ua = window.navigator.userAgent;
    return ua.indexOf('Trident/') > 0 || ua.indexOf('MSIE ') > 0;
  }

  replaceFilteredData(value: any) {
    this.data = value.data;
    this.categoryFilter = value.categoryFilter;
  }
  /**
   * Triggers the modal to apear. Modaloption can be passed as arguments
   * See: https://ng-bootstrap.github.io/#/components/modal/examples
   */
  openLg(infoBtnContent) {
    this.modalService.open(infoBtnContent, { size: 'lg' , windowClass: 'animated slideInUp' });
  }

  /**
   * gets correct description for Status in data
   * @param entry
   */
  parseStatus(entry) {
    let status;
    switch(entry) {
      case 'A':
        status = 'Abgeschlossen (A)';
        break;
      case 'B':
        status = 'in Bearbeitung (B)';
        break;
      default:
        status = 'Unbekannt';
    }

    return status;
  }
}
