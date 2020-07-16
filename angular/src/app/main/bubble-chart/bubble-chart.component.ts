import { AfterViewInit, Component, Input, OnChanges, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
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
      // Small timeout, otherwise the id of the buttons aren't correctly set until d3.js needs them
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
    // send SVG to other component in case needed for PDF creation
    this.sendSvgData();

    //this.vis.nativeElement.addEventListener('click', this.onClick.bind(this)) TODO: add later
  }

  // click on category labels
  onClick(event) {
    const classes = (event.target as Element).className['baseVal'].split(' ');
    if (classes.indexOf('categoryLabels') > -1) {
      this.dataService.filterByCategory(this.data, event.target.innerHTML)
    }
  }

  private sendSvgData(): void {
    this.dataService.sendSvgData(this.vis.nativeElement);
  }

}
