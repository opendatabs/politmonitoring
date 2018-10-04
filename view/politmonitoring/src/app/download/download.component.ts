import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { trigger, state, animate, transition, style } from '@angular/animations';
import { AuthService } from '../shared/auth.service';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as saveSvgApi from 'save-svg-as-png';
import * as canvg from 'canvg';

declare var jsPDF: any;

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
  admin: boolean;
  svg: any;
  paused = false;

  constructor(
    private dataService: DataService,
    private elRef: ElementRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.dataService.data.subscribe(data => {
      // if (data.length && data[0]['Jahr']) {
      //   debugger
      //   this.data = data.map( e => {
      //     let eo = {};
      //     eo[e['Jahr']] = e.Jahr;
      // }
      this.data = data;
    });
    this.dataService.originalData.subscribe(originalData => this.originalData = originalData);
    this.dataService.svg.subscribe(svg => this.svg = svg);
    this.authService.currentAdminState.subscribe(admin => this.admin = admin);
  }

  @HostListener('document:click', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  checkForNoneDropdownClick(event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.showDownloadMenu = false;
    }
  }

  onDownloadCsv(): void {
    debugger;
    const csv: { downloadData: object[], options: object } = this.prepareCsv(this.data);
    new Angular5Csv(csv.downloadData, this.nameFile(true), csv.options);
  }

  onDownloadFullCsv(): void {
    const csv: { downloadData: object[], options: object } = this.prepareCsv(this.originalData);
    new Angular5Csv(csv.downloadData, this.nameFile(true), csv.options);
  }

  onDownloadXlsx(): void {
    XLSX.writeFile(
      this.createXlsx(this.clearData(this.data)),
      this.nameFile(true) + '.xlsx');
  }

  onDownloadFullXlsx(): void {
    XLSX.writeFile(
      this.createXlsx(this.clearData(this.originalData)),
      this.nameFile() + '.xlsx');
  }

  onDownloadPdf(): void {
    // const xml = new XMLSerializer().serializeToString(this.svg.childNodes[0]);
    // const b64Start = 'data:image/svg + xml; base64,' + btoa(xml);

    // pause any user input, until downlaod has started
    this.paused = true;
    // add canvg option so the the png string conversion works with IE11
    // https://github.com/exupero/saveSvgAsPng
    saveSvgApi.svgAsPngUri(this.svg.childNodes[0], { canvg: canvg }, uri => {
      this.drawPdf(this.data, uri, this.nameFile(true));
      this.paused = false;
    });
  }

  onDownloadFullPdf(): void {
    this.paused = true;
    saveSvgApi.svgAsPngUri(this.svg.childNodes[0], { canvg: canvg }, uri => {
      this.drawPdf(this.originalData, uri, this.nameFile());
      this.paused = false;
    });
  }

  drawPdf(data: object[], graphUri: string, fileName: string) {
    const columns: Array<{ title: string; dataKey: string; }> = [
      { title: 'Geschäft', dataKey: 'Geschäfts-nr' },
      { title: 'Instrument', dataKey: 'Instrument' },
      { title: 'Urherber', dataKey: 'UrheberIn' },
      { title: 'Titel', dataKey: 'Titel' },
      { title: 'Status', dataKey: 'Status' },
      { title: 'Jahr', dataKey: 'Jahr' },
      { title: 'Partei', dataKey: 'Partei' },
      { title: 'Themen-\nbereich 1', dataKey: 'Themenbereich 1' },
      { title: 'Thema 1', dataKey: 'Thema 1' },
      { title: 'Thema 2', dataKey: 'Thema 2' },
    ];

    let fontSize = 8;
    let titleColumnWidth = 60;
    const columnStyles = {
      'Geschäfts-nr': { columnWidth: 18 },
      'Instrument': { columnWidth: 18 },
      'UrheberIn': { columnWidth: 25 },
      'Titel': { columnWidth: titleColumnWidth },
      'Status': { columnWidth: 25 },
      'Jahr': { columnWidth: 10 },
      'Partei': { columnWidth: 18 },
      'Themenbereich 1': { columnWidth: 30 },
      'Thema 1': { columnWidth: 31 },
      'Thema 2': { columnWidth: 31 },
    };

    // smaller table properties with more columns if the user has admin privileges
    if (this.admin) {
      fontSize = 7;
      titleColumnWidth = 80;
      columns.push({ title: 'Schwer-\npunkt', dataKey: 'Schwerpunktthema (bei Bedarf)' });
      columnStyles['Schwerpunktthema(bei Bedarf)'] = { columnWidth: 20 };
    }

    const doc = new jsPDF({ orientation: 'landscape' });
    // add header
    doc.text(7, 15, 'Politmonitor Basel-Stadt');
    // add the graph produced from a base64 png string. Add position and size
    doc.addImage(graphUri, 'PNG', 5, 15, this.calcWidth(), 150);
    // generate a table from cleared data
    doc.autoTable(columns, this.clearData(data), {
      startY: 800,
      margin: { horizontal: 7 },
      bodyStyles: { valign: 'top' },
      styles: {
        overflow: 'linebreak',
        fontSize: fontSize,
      },
      columnStyles: columnStyles
    });
    doc.save(fileName + '.pdf');
  }

  private calcWidth(): number {
    const w = this.svg.childNodes[0].clientWidth;
    if (w && w > 0) {
      const ratio = 600 / w;
      if (ratio <= 0.5) {
        return 300;
      } else {
        return 150 / ratio;
      }
    } else {
      return 300;
    }
  }

  /*
   * Names a file as construction of a convention and adds the current date and wether the
   * data was perviously filterd
   * @param filtered is a boolean value of wether the user requests the entire dataset
   * or the filtered version
   * @return the file title as string containing date and filter status
  */
  private nameFile(filtered: boolean = false): string {
    const filterStatus: string = (!filtered ? '' : '_(gefiltert)');
    const timestamp: string = moment().format('DD/MM/YYYY');
    return `Politmonitor_Basel_Stadt_${timestamp}${filterStatus}`;
  }

  /*
   * Prepare a file of type .xlsx by creating a workbook and appending
   * the data as worksheet
   * @param data is the complete data.json or a subset thereof. Data is of type collection
   * @return the full or filtered data as workbook
  */
  private createXlsx(data: object[]): XLSX.WorkBook {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
     // add the worksheet to the workbook, name the tab
    XLSX.utils.book_append_sheet(wb, ws, 'Grossratsgeschäfte');
    return wb;
  }

  /*
   * Clears the data before the download of any properties that are only useful
   * to the admin user or that have no information character
   * @param data the data that is supposed to be cleared
   * @return a filtered deep-copy of the data param
  */
  clearData(data: object[]): object[] {
    const tmp: object[] = JSON.parse(JSON.stringify(data));
    tmp.forEach(e => {
      if (e.hasOwnProperty('Themenbereich_Number')) {
        delete e['Themenbereich_Number'];
      }
      if (e.hasOwnProperty('Thema2_Number')) {
        delete e['Thema2_Number'];
      }
    });
    if (this.admin) {
      return tmp;
    } else {
      tmp.forEach( e => {
        if (e.hasOwnProperty('Schwerpunktthema (bei Bedarf)')) {
          delete e['Schwerpunktthema (bei Bedarf)'];
        }
      });
      return tmp;
    }
  }

  /*
   * Sets the options for the CSV file and clears the data intended for CSV-downlaod
   * @param data is the uncleared data, about to be downloaded
   * @return an object containing the cleared data and the CSV-options
  */
  private prepareCsv(data: object[]): { downloadData: object[], options: object } {
    let headers: Array<string> = [];
    const downloadData: object[] = this.clearData(data);
    if (downloadData.length) {
      headers = Object.keys(downloadData[0]);
    }
    const options: object = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: false,
      showTitle: false,
      useBom: false,
      noDownload: false,
      headers: headers
    };
    return { downloadData, options };
  }
}
