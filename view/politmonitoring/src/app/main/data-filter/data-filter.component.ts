import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DataService} from "../../shared/data.service";
declare const $: any;

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.css']
})
export class DataFilterComponent implements OnInit, AfterViewChecked, OnChanges {

  @Input() data: any[];
  @Output() onFiltered: EventEmitter<any> = new EventEmitter();

  searchText: String;
  originalData: any[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    window.addEventListener('scroll', DataFilterComponent.scroll, true);
  }

  ngAfterViewChecked(): void {
    DataFilterComponent.scroll();
  }

  ngOnChanges(changes: any) {
    if (changes.data.currentValue && this.originalData.length === 0) {
      this.originalData = changes.data.currentValue;
    }
  }

  search() {
    this.data = this.dataService.searchInArrayOfObjects(this.originalData, this.searchText);
    this.onFiltered.emit(this.data);
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.search();
    }
  }

  static scroll() {
    let navHeight = $('.navbar').outerHeight();
    let scrollTop = navHeight - $(window).scrollTop();
    $(".custom-fixed-navbar").css('top', (Math.max(scrollTop, 0)));
  }

}
