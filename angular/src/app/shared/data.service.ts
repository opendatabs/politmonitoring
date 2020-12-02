import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {Category} from './category';

declare const $: any;
declare var jQuery: any;
import themenbereiche from '../../assets/themenbereiche.json';
import descriptions from '../../assets/descriptions.json';
import searchwords from '../../assets/searchwords.json';


@Injectable()
export class DataService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  private dataSrc = new BehaviorSubject([]);
  data = this.dataSrc.asObservable();

  private orgDataSrc = new BehaviorSubject([]);
  originalData = this.orgDataSrc.asObservable();

  private svgSrc = new BehaviorSubject([]);
  svg = this.svgSrc.asObservable();

  private sortScr = new BehaviorSubject([{sortBy: 'Geschäfts-Nr', asc: false}]);
  sort = this.sortScr.asObservable();

  private categoryFromBubbleChart = new BehaviorSubject('');

  constructor(
    private http: HttpClient
  ) {
  }

  static extractNumber(content: string): number {
    const start = content.indexOf('(') + 1;
    const end = content.indexOf(')');
    let number: number;
    if (content.length > 0) {
      number = parseInt(content.substring(start, end));
    } else {
      number = -1;
    }
    // if (isNaN(number)) {
    //   console.error('Could not find number');
    // }
    return number;
  }

  getData(): Observable<any[]> {
    const url = environment.apiUrl + 'data';
    return this.http.get<any[]>(url);
  }

  getDataNew(): Observable<any[]> {
    const url = environment.apiUrl + 'get-data';
    return this.http.get<any[]>(url);
  }

  getCategories() {
    return themenbereiche;
  }

  getCategoryForSubCategory(subcategory: string) {
    const category = themenbereiche.find(elem => {
      return elem.children.includes(subcategory);
    });
    return category ? category.name : undefined;
  }

  findSearchSuggestions(searchText: string): { parent: string, child: string }[] {
    let result = [];
    searchwords.forEach(d => {
      const suptopic = d.name;
      d.children.forEach(subtopic => {
        const searchwords = subtopic['searchwords'].split(',');
        searchwords.forEach(searchword => {
          const cleanSearchword = searchword.trim();
          if (cleanSearchword.toLocaleLowerCase().startsWith(searchText.toLocaleLowerCase())) {
            if (!result.map(d => d.parent).includes(suptopic)) {
              result.push({parent: suptopic, child: subtopic.name})
            }
          }
        });

      })
    });
    return result;
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
          //TODO: add tipp if person is looking for a word in here.
          /*if (['Thema 1', 'Thema 2'].indexOf(key) > -1) {
            if (entry[key] !== null && descriptions['category'][entry[key]] && descriptions['category'][entry[key]].toString().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1) {
              found = true;
            }
          }
          if (key === 'schwerpunkt') {
            if (entry[key] !== null && descriptions['key_topic'][entry[key]] && descriptions['key_topic'][entry[key]].toString().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1) {
              found = true;
            }
          }*/
        }
      }
      if (found) {
        result.push(entry);
      }
    }
    return result;
  }

  filterByCategory(data: any[], category: string): any[] {
    return data.filter(d => {
      return d['Themenbereich 1'] === category || d['Themenbereich 2'] === category;
      //return d.Themenbereich_Number === category || d.Thema2_Number === category;
    });
  }

  filterByKeyTopic(data: any[], keyTopicFilter: string) {
    return data.filter(d => {
      return d['Schwerpunktthema (bei Bedarf)'] === keyTopicFilter;
    });
  }

  filterBySubCategory(data: any[], subCategoryFilter: string) {
    return data.filter(d => {
      if (d['Thema 2'] === subCategoryFilter) {
        // console.log('hier');
      }
      return d['Thema 1'] === subCategoryFilter ||
        d['Thema 2'] === subCategoryFilter;
    });
  }

  filterYears(data: any[], years: any[]) {
    return data.filter(d => {
      let found = false;
      years.forEach(y => {
        if (y.checked && y.year === d.Jahr) {
          found = true;
        } else if (y.checked && y.year === 'letztes Quartal') {
          const today = new Date();
          const dataDate = new Date(d['beginn_datum']);
          if (dataDate.getFullYear() === today.getFullYear() && dataDate.getMonth() >= today.getMonth() - 3) {
            found = true;
          }
        }
      });
      return found;
    });
  }

  filterInstruments(data: any[], instruments: any[]) {
    return data.filter(d => {
      let found = false;
      instruments.forEach(y => {
        if (y.checked && y.name === d.Instrument) {
          found = true;
        }
      });
      return found;
    });
  }

  filterParties(data: any[], parties: any[]) {
    return data.filter(d => {
      let found = false;
      parties.forEach(y => {
        if (y.checked && y.name === d.Partei) {
          found = true;
        }
      });
      return found;
    });
  }

  filterByStatus(data: any[], statusFilter: String) {
    return data.filter(d => {
      return d.Status.toLowerCase() === statusFilter.toLowerCase();
    });
  }

  filterByParty(data: any[], partyFilter: string) {
    return data.filter(d => {
      return d.Partei.toLowerCase() === partyFilter.toLowerCase();
    });
  }

  filterByInstrument(data: any[], instrumentFilter: string) {
    return data.filter(d => {
      return d.Instrument.toLowerCase() === instrumentFilter.toLowerCase();
    });
  }

  unique(array): any[] {
    return $.grep(array, function (el, index) {
      return index == $.inArray(el, array) && el && el.length > 0;
    });
  }

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

  setCategoryFromBubbleChart(category: string) {
    this.categoryFromBubbleChart.next(category);
  }

  getCategoryFromBubbleChart() {
    return this.categoryFromBubbleChart;
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
