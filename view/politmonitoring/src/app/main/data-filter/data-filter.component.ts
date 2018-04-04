import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DataService} from '../../shared/data.service';
import moment = require('moment');
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
  dropdown: String[];
  categoryFilter: String = 'all';
  fromDate: string = '2015-01-01';
  toDate: string = moment().format('YYYY-MM-DD');

  static scroll() {
    const navHeight = $('.navbar').outerHeight();
    const scrollTop = navHeight - $(window).scrollTop();
    $('.custom-fixed-navbar').css('top', (Math.max(scrollTop, 0)));
  }

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
    // save originalData when data is loaded the first time
    if (changes.data.currentValue && this.originalData.length === 0) {
      this.originalData = changes.data.currentValue;
      this.initDropdown();
    }
  }

  filterData(category: String) {
    this.data = this.originalData;
    if (category.length !== 0) {
      this.categoryFilter = category;
    }
    if (this.categoryFilter !== 'all') {
      this.data = this.dataService.filterByCategory(this.data, this.categoryFilter);
    }
    this.data = this.dataService.searchInArrayOfObjects(this.data, this.searchText);
    this.data = this.dataService.filterByDate(this.data, this.fromDate, this.toDate);
    this.onFiltered.emit(this.data);
  }

  filterByDate() {
    if (moment(this.fromDate).isValid() && new Date(this.fromDate) > new Date('2000-01-01') &&
      moment(this.toDate).isValid() && new Date(this.toDate) > new Date('2000-01-01')) {
      this.filterData('');
    }
  }

  initDropdown() {
    this.dropdown = $.unique(this.originalData.map(d => d.themenbereich));
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.filterData('');
    }
  }

}
