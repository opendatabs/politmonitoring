import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
declare var BubbleChart;

@Component({
    selector: 'app-bubble-chart',
    templateUrl: './bubble-chart.component.html',
    styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, AfterViewChecked {
    @Input() data;

    bubblesInitialized: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewChecked(): void {
        if (!this.bubblesInitialized) {
            this.bubblesInitialized = true;
            BubbleChart.initialize();
        }
    }


}
