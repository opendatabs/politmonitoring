import { Component, OnInit } from '@angular/core';
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
          });
          // Remove empty elements from array
          const filteredData = data.filter( el => el['Geschäfts-nr'] > 0);
          this.data = filteredData;
          this.originalData = filteredData;
        },
        (err) => {
          alert('An error occurred. See console for details.');
          console.log(err);
        });
  }

  replaceFilteredData(filteredData: any[]) {
    this.data = filteredData;
  }
}
