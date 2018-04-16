import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DataService} from '../../shared/data.service';
import * as moment from 'moment';
declare const $: any;

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.css']
})
export class DataFilterComponent implements OnInit, AfterViewChecked, OnChanges {

  @Input() data: any[];
  @Output() onFiltered: EventEmitter<any> = new EventEmitter();

  searchText: String = '';
  originalData: any[] = [];
  categoryDropdown: String[];
  yearDropdown = [];
  categoryFilter: String = 'all';
  statusFilter: String = 'all';
  filtered: boolean = false;

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
/*    $(document).ready(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });*/
  }

  ngOnChanges(changes: any) {
    // save originalData when data is loaded the first time
    if (changes.data.currentValue && this.originalData.length === 0) {
      this.originalData = changes.data.currentValue;
      this.initDropdown();
    }
  }

  filterData() {
    this.data = this.originalData;
    if (this.categoryFilter !== 'all') {
      this.data = this.dataService.filterByCategory(this.data, this.categoryFilter);
    }
    if (this.statusFilter !== 'all') {
      this.data = this.dataService.filterByStatus(this.data, this.statusFilter);
    }
    this.data = this.dataService.searchInArrayOfObjects(this.data, this.searchText);
    this.data = this.dataService.filterYears(this.data, this.yearDropdown);
    // check if any filter is set.
    this.filtered = this.categoryFilter !== 'all' || this.searchText.length > 0 || this.statusFilter !== 'all';
    this.yearDropdown.forEach(d => {
      if (!d.checked) {
        this.filtered = true;
      }
    });
    this.onFiltered.emit(this.data);
  }

  initDropdown() {
    this.categoryDropdown = $.unique(this.originalData.map(d => d.Themenbereich));
    this.categoryDropdown.sort();
    this.yearDropdown = $.unique(this.originalData.map(d => d.Jahr));
    this.yearDropdown = this.yearDropdown.map(d => {
      return {year: d, checked: true};
    });
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.filterData();
    }
  }
  filterYears(entry: any) {
    entry.checked = !entry.checked;
    this.filterData();
  }
  filterStatus(status: string) {
    this.statusFilter = status;
    this.filterData();
  }
  filterByCategory(category: string) {
    this.categoryFilter = category;
    this.filterData();
  }
  resetFilters() {
    this.searchText = '';
    this.categoryFilter = 'all';
    this.yearDropdown.forEach( d => {
      d.checked = true;
    });
    this.statusFilter = 'all';
    this.filterData();
  }

}
