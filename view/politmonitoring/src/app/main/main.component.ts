import {Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnChanges {
  admin: boolean;
  data: any[];
  originalData: any[];
  @Input() redrawChart: boolean = false;

  constructor(
      private dataService: DataService,
      private authService: AuthService,
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dataService.getData().subscribe(
        (data) => {
          data.forEach(d => {
            d.Themenbereich = d.Themenbereich.substring(0, d.Themenbereich.indexOf('(')).trim();
          });
          this.data = data;
          this.originalData = data;
        },
        (err) => {
          alert('An error occurred. See console for details.');
          console.log(err);
        });

    this.route.url.subscribe(
      (url) => {
        if (url.length >= 1)
          if (url[url.length - 1].path === 'admin')
            this.authService.requestLogin().subscribe(
              event => this.admin = event,
              error => console.log(error)
            );
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.redrawChart.currentValue) {
      console.log('getting new data now');
      // this.dataService.getData().subscribe(
      //   (data) => {
      //     this.data = data;
      //     this.originalData = data;
      //     this.redrawChart = false;
      //   },
      //   (err) => {
      //     console.log(err);
      //   });
    }
  }
  onUpload(redrawChart: boolean) {
    this.redrawChart = redrawChart;
  }

  replaceFilteredData(filteredData: any[]) {
    this.data = filteredData;
  }
}
