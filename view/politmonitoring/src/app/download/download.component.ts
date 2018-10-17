import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { AuthService } from '../shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import * as saveSvgApi from 'save-svg-as-png';
import * as canvg from 'canvg';
import * as jsPDF from 'jspdf';
declare var jsPDF: any;

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent implements OnInit {

  @ViewChild('downlaodBtnContent') downloadBtnContent: ElementRef;
  data: object[];
  originalData: object[];
  admin: boolean;
  svg: any;
  paused = false;
  sortBy: any;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    // Use various services to fetch information from different components
    this.authService.currentAdminState.subscribe(admin => this.admin = admin);
    this.dataService.data.subscribe(data => this.data = data);
    this.dataService.originalData.subscribe(originalData => this.originalData = originalData);
    this.dataService.svg.subscribe(svg => this.svg = svg);
    this.dataService.sort.subscribe(sort => this.sortBy = sort);

  }

  onDownloadCsv(): void {
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
    // Use sorting order of bootstrap-table
    const d = this.reorder(JSON.parse(JSON.stringify(this.data)), this.sortBy[0].sortBy, this.sortBy[0].asc);
    // Stop further downloads while file creation in progress
    this.paused = true;
    console.log(d);
    // add canvg option so the the png string conversion works with IE11
    // https://github.com/exupero/saveSvgAsPng
    saveSvgApi.svgAsPngUri(this.svg.childNodes[0], { canvg: canvg }, uri => {
      this.drawPdf(d, uri, this.nameFile(true));
      this.paused = false;
    });
  }

  onDownloadFullPdf(): void {
    this.paused = true;
    saveSvgApi.svgAsPngUri(this.svg.childNodes[0], { canvg: canvg }, uri => {
      this.drawPdf(JSON.parse(JSON.stringify(this.originalData)), uri, this.nameFile());
      this.paused = false;
    });
  }

/**
 * Creates the PDF by extracting including the SVG graph and generating a table out of the data
 *
 * @param {string[]} data that is chosen by the user. Either filtered or the full default dataset
 * @param {string} graphUri data of the SVG graph
 * @param {string} fileName name under which the file is saved
 * @memberof DownloadComponent
 */
drawPdf(data: string[], graphUri: string, fileName: string): void {
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
    // All columnwiths have to be defined corresponding to their content width
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
      columnStyles: columnStyles,
    });
    // download the file
    doc.save(fileName + '.pdf');
  }
  /* Triggers the modal to apear. Modaloption can be passed as arguments
   * See: https://ng-bootstrap.github.io/#/components/modal/examples
   */
  openLg(downloadBtnContent) {
    this.modalService.open(downloadBtnContent, { windowClass: 'customModal' });
  }

/**
 * Calculate the appropritae width of the SVG graph when printed to PDF
 *
 * @private
 * @returns {number} image with in px
 * @memberof DownloadComponent
 */
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

  /* Names a file as construction of a convention and adds the current date and wether the
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

  /* Prepare a file of type .xlsx by creating a workbook and appending
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

  /* Clears the data before the download of any properties that are only useful
   * to the admin user or that have no information character
   * @param data the data that is supposed to be cleared
   * @return a filtered deep-copy of the data param
   */
  private clearData(data: any[]): object[] {
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

  /* Sets the options for the CSV file and clears the data intended for CSV-downlaod
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

  /* Sort the handed collection by the given column header
   * @param arr is the dataset to be ordered
   * @param sortBy is the column header that the column is supposed to be ordered by
   * @param asc arranged ascending or descending sorting
   * @return the ordered collection
   */
  private reorder(arr: Array <string>, sortBy: string, asc: boolean): Array <string> {
    arr.sort((a: any, b: any) => {
      let returnValue: number;
      if (a[sortBy] < b[sortBy]) {
        returnValue = -1;
      } else if (a[sortBy] > b[sortBy]) {
        returnValue = 1;
      } else {
        returnValue = 0;
      }
      if (asc) {
        return returnValue;
      } else {
        return returnValue * (-1);
      }
    });
    return arr;
  }
}
