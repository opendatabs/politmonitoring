import {AfterViewChecked, AfterViewInit, Component, Input, OnChanges, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
declare var BubbleChart;
import * as $ from 'jquery';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.css']
})
export class BubbleChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data;
  @Input() categoryFilter;

  @ViewChild('vis') vis: ElementRef;

  bubblesInitialized = false;
  lastDataLoaded: object;

  constructor(
    private dataService: DataService,
  ) { }


  ngOnInit() {
  }

  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      // we have to set a small timeout. otherwise, the id of the buttons aren't correctly set until d3 needs them
      setTimeout(() => {
        this.lastDataLoaded = changes.data.currentValue;
        BubbleChart.initialize(changes.data.currentValue, this.categoryFilter);
      }, 50);
    }
  }

  setId() {
    if (!this.categoryFilter || this.categoryFilter === 'all')
      return 'themenbereich';
    else
      return 'thema_1';
  }

  // Reload the graph on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    setTimeout(function () {
      BubbleChart.initialize(this.lastDataLoaded, this.categoryFilter);
    }, 900);
  }

  ngAfterViewInit() {
    this.sendSvgData();
  }

  private sendSvgData(): void {
    this.dataService.sendSvgData(this.vis.nativeElement);
  }

}
