import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DataService} from '../../shared/data.service';
import * as moment from 'moment';
declare const $: any;
declare var jQuery: any;

interface jQuery {
  tooltip(options?: any): any;
}

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.css']
})
export class DataFilterComponent implements OnInit, AfterViewChecked, OnChanges {

  @Input() data: any[];
  @Output() onFiltered: EventEmitter<any> = new EventEmitter();

  searchText: string = '';
  originalData: any[] = [];
  categoryDropdown: string[];
  yearDropdown = [];
  categoryFilter: string = 'all';
  statusFilter: string = 'all';
  filtered: boolean = false;
  subCategoryFilter: string = 'all';
  subCategoryDropdown: string[];

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

  filterData() {
    this.data = this.originalData;
    if (this.categoryFilter !== 'all') {
      this.data = this.dataService.filterByCategory(this.data, this.categoryFilter);
      if (this.subCategoryFilter !== 'all') {
        this.data = this.dataService.filterBySubCategory(this.data, this.subCategoryFilter);
      }
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
    this.onFiltered.emit({data: this.data, categoryFilter: this.categoryFilter});
  }

  initDropdown() {
    this.categoryDropdown = this.dataService.unique(this.originalData.map(d => d.Themenbereich));
    this.categoryDropdown.sort();
    this.yearDropdown = this.dataService.unique(this.originalData.map(d => d.Jahr));
    // sort descending
    this.yearDropdown.sort((a, b) => {
      return b - a;
    });
    // check only last 3 years
    this.yearDropdown = this.yearDropdown.map((d, i) => {
      return {year: d, checked: (i < 3)};
    });
    this.filterData();
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
    // prepare sub category dropdown
    let allCategories = this.data.map(d => d["Thema 1 (gleiche Nr wie Themenbereich)"]);
    this.subCategoryDropdown = this.dataService.unique(allCategories);
    this.subCategoryDropdown.sort();
    this.subCategoryFilter = 'all';
  }
  filterBySubCategory(subCategory: string) {
    this.subCategoryFilter = subCategory;
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
