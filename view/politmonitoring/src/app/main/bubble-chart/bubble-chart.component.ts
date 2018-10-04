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

  innerWidth: number;
  bubblesInitialized = false;
  lastDataLoaded: object;

  constructor(
    private dataService: DataService,
  ) { }


  ngOnInit() {
    // capture window with to detect size changes
    this.innerWidth = window.innerWidth;
  }

  ngOnChanges(changes: any): void {
    if (changes.data && changes.data.currentValue) {
      // we have to set a small timeout. otherwise, the id of the buttons aren't correctly set until d3 needs them
      setTimeout(() => {
        this.lastDataLoaded = changes.data.currentValue;
        this.bubblesInitialized = true;
        BubbleChart.initialize(changes.data.currentValue, this.categoryFilter);
      }, 50);
    }
  }

  setId() {
    if (!this.categoryFilter || this.categoryFilter === 'all') {
      return 'themenbereich_1';
    } else {
      return 'thema_1';
    }
  }

  // Reload the graph on horizontal window resize
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.innerWidth !== window.innerWidth && this.bubblesInitialized) {
      setTimeout(() => {
        BubbleChart.initialize(this.lastDataLoaded, this.categoryFilter);
      }, 900);
      this.innerWidth = window.innerWidth;
    }
  }

  ngAfterViewInit() {
    this.sendSvgData();
  }

  private sendSvgData(): void {
    this.dataService.sendSvgData(this.vis.nativeElement);
  }

}
