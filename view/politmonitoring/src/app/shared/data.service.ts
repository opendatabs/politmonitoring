import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

@Injectable()
export class DataService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) { }

    getData(): Observable<any[]> {
      const url = environment.apiUrl + 'data';
      return this.http.get<any[]>(url);
    }

    searchInArrayOfObjects(data:any[], searchText:String): any[] {
      debugger;
      const list = data;
      let result = [];
      if (typeof list === 'undefined' || typeof searchText === 'undefined' || searchText === '')
        return data;

      let found: boolean;
      for (let entry of list) {
        found = false;
        for(let key in entry) {
          if (entry.hasOwnProperty(key)) {
            if (entry[key] !== null && entry[key].toString().toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1) {
              found = true;
            }
          }
        }
        if (found) {
          result.push(entry)
        }
      }
      return result;
    }

}
