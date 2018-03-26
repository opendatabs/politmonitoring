import { Component, OnInit } from '@angular/core';
import {DataService} from "../shared/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  data: any[];
  originalData: any[];

  constructor(
      private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
        (data) => {
          this.data = data;
          this.originalData = data;
        },
        (err) => {
          alert('An error occurred. See console for details.');
          console.log(err);
        }
    )
  }

  replaceFilteredData(filteredData: any[]) {
    this.data = filteredData;
  }
}
