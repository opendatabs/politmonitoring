import {AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
declare var BubbleChart;

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
            BubbleChart.initialize(changes.data.currentValue);
        }
    }


}
