import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
declare var BubbleChart;
import * as $ from 'jquery';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, OnChanges {
  @Input() data;
  @Input() categoryFilter;

  bubblesInitialized: boolean = false;

  constructor() {
  }


  ngOnInit() {
  }

  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      // we have to set a small timeout. otherwise, the id of the buttons aren't correctly set until d3 needs them
      setTimeout(function () {
        BubbleChart.initialize(changes.data.currentValue);
      }, 50);
    }
  }

  setId() {
    if (!this.categoryFilter || this.categoryFilter === 'all')
      return 'themenbereich';
    else
      return 'thema_1';
  }

}
