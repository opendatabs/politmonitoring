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

    bubblesInitialized: boolean = false;

    constructor() {
    }


    ngOnInit() {
    }

    ngOnChanges(changes: any): void {
      if (changes.data && changes.data.currentValue) {
        if (!changes.data.previousValue) {
            BubbleChart.initialize(changes.data.currentValue);
          } else {
            BubbleChart.update(changes.data.currentValue);
          }
        }
    }


}
