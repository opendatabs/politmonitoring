import {Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  data: any[];
  originalData: any[];

  constructor(
      private dataService: DataService,
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
        },
        (err) => {
          alert('An error occurred. See console for details.');
          console.log(err); // TODO Add error handling
        });
  }

  replaceFilteredData(filteredData: any[]) {
    this.data = filteredData;
  }
}
