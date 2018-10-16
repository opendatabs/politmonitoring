import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from './category';
declare const $: any;
declare var jQuery: any;

// TODO: Comment this file

@Injectable()
export class DataService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  private dataSrc = new BehaviorSubject([]);
  data = this.dataSrc.asObservable();

  private orgDataSrc = new BehaviorSubject([]);
  originalData = this.orgDataSrc.asObservable();

  private svgSrc = new BehaviorSubject([]);
  svg = this.svgSrc.asObservable();

  private sortScr = new BehaviorSubject([{ sortBy: 'Geschäfts-Nr', asc: false }]);
  sort = this.sortScr.asObservable();

  constructor(
    private http: HttpClient
    ) {}

  static extractNumber(content: string): number {
    const start = content.indexOf('(') + 1;
    const end = content.indexOf(')');
    let number: number;
    if (content.length > 0) {
      number = parseInt(content.substring(start, end));
    } else {
      number = -1;
    }
    if (isNaN(number)) {
      console.error('Could not find number');
    }
    return number;
  }

  getData(): Observable<any[]> {
    const url = environment.apiUrl + 'data';
    return this.http.get<any[]>(url);
  }

  searchInArrayOfObjects(data: any[], searchText: String): any[] {
    const list = data;
    const result = [];
    if (typeof list === 'undefined' || typeof searchText === 'undefined' || searchText === '') {
      return data;
    }

    let found: boolean;
    for (const entry of list) {
      found = false;
      for (const key in entry) {
        if (entry.hasOwnProperty(key)) {
          if (entry[key] !== null && entry[key].toString().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1) {
            found = true;
          }
        }
      }
      if (found) {
        result.push(entry);
      }
    }
    return result;
  }

  filterByCategory(data: any[], category: number): any[] {
    return data.filter((d) => {
      return d.Themenbereich_Number === category || d.Thema2_Number === category;
    });
  }

  filterByKeyTopic(data: any[], keyTopicFilter: string) {
    return data.filter((d) => {
      return d['Schwerpunktthema (bei Bedarf)'] === keyTopicFilter;
    });
  }

  filterBySubCategory(data: any[], subCategoryFilter: string) {
    return data.filter((d) => {
      if (d['Thema 2'] === subCategoryFilter) {
        // console.log('hier');
      }
      return d['Thema 1'] === subCategoryFilter ||
        d['Thema 2'] === subCategoryFilter;
    });
  }

  filterYears(data: any[], years: any[]) {
    return data.filter((d) => {
      let found = false;
      years.forEach(y => {
        if (y.checked && y.year === d.Jahr) {
          found = true;
        }
      });
      return found;
    });
  }

  filterByStatus(data: any[], statusFilter: String) {
    return data.filter((d) => {
      return d.Status.toLowerCase() === statusFilter.toLowerCase();
    });
  }

  filterByParty(data: any[], partyFilter: string) {
    return data.filter((d) => {
      return d.Partei.toLowerCase() === partyFilter.toLowerCase();
    });
  }

  filterByInstrument(data: any[], instrumentFilter: string) {
    return data.filter((d) => {
      return d.Instrument.toLowerCase() === instrumentFilter.toLowerCase();
    });
  }

  /*
   *
   */
  unique(array): any[] {
    return $.grep(array, function(el, index) {
      return index == $.inArray(el, array);
    });
  }

  /*
   *
   */
  uniqueCategories(categories: Category[]) {
    const unique: Category[] = [];
    categories.forEach(d => {
      let found = false;
      unique.forEach(u => {
        if (u.number === d.number) {
          found = true;
        }
      });
      if (!found) {
        unique.push(d);
      }
    });
    return unique;
  }

  sendJSON(data: object[]): void {
    this.dataSrc.next(JSON.parse(JSON.stringify(data)));
  }

  sendOriginalJSON(originalData: object[]): void {
    this.orgDataSrc.next(JSON.parse(JSON.stringify(originalData)));
  }

  sendSvgData(svg: [object]): void {
    this.svgSrc.next(svg);
  }

  sendCurrentSort(sort: { sortBy: string, asc: boolean }): void {
    this.sortScr.next([sort]);
  }
}
