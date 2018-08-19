import {AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {DataService} from '../../shared/data.service';
import * as moment from 'moment';
import {AuthService} from "../../shared/auth.service";
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

  @Input() data: any[]; //TODO: get via service
  @Output() onFiltered: EventEmitter<any> = new EventEmitter();

  searchText: string = '';
  originalData: any[] = []; //TODO: get via service
  categoryDropdown: string[];
  keyTopicDropdown: string[];
  partyDropdown: string[];
  instrumentDropdown: string[];
  yearDropdown = [];
  categoryFilter: string = 'all';
  keyTopicFilter: string = 'all';
  partyFilter: string = 'all';
  instrumentFilter: string = 'all';
  statusFilter: string = 'all';
  filtered: boolean = false;
  yearFilterSet: boolean = false;
  subCategoryFilter: string = 'all';
  subCategoryDropdown: string[];
  admin: boolean;

  static scroll() {
    const navHeight = $('.navbar').outerHeight();
    const scrollTop = navHeight - $(window).scrollTop();
    $('.custom-fixed-navbar').css('top', (Math.max(scrollTop, 0)));
  }

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    window.addEventListener('scroll', DataFilterComponent.scroll, true);
    this.authService.currentAdminState.subscribe(admin => this.admin = admin);
  }

  ngAfterViewChecked(): void {
    DataFilterComponent.scroll();
  }

  ngOnChanges(changes: any) {
    // save originalData when data is loaded the first time
    if (changes.data.currentValue && this.originalData.length === 0) {
      this.originalData = changes.data.currentValue;
      this.initDropdowns();
      this.getOriginalDownloadData();
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.filterData();
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
    if (this.keyTopicFilter !== 'all') {
      this.data = this.dataService.filterByKeyTopic(this.data, this.keyTopicFilter);
    }
    if (this.statusFilter !== 'all') {
      this.data = this.dataService.filterByStatus(this.data, this.statusFilter);
    }
    if (this.partyFilter !== 'all') {
      this.data = this.dataService.filterByParty(this.data, this.partyFilter);
    }
    if (this.instrumentFilter !== 'all') {
      this.data = this.dataService.filterByInstrument(this.data, this.instrumentFilter);
    }
    this.data = this.dataService.searchInArrayOfObjects(this.data, this.searchText);
    this.data = this.dataService.filterYears(this.data, this.yearDropdown);
    // check if any filter is set.
    this.checkFilterYearsSet();
    this.filtered = this.categoryFilter !== 'all' || this.keyTopicFilter !== 'all' || this.searchText.length > 0
      || this.statusFilter !== 'all' || this.yearFilterSet || this.partyFilter !== 'all' || this.instrumentFilter !== 'all';
    // do this async (not in same angular digest). Otherwise, it will throw expressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      console.log(this.data);
      this.onFiltered.emit({data: this.data, categoryFilter: this.categoryFilter});
      this.getDownloadData();
    }, 0)
  }

  filterYears(entry: any) {
    entry.checked = !entry.checked;
    this.filterData();
  }

  checkAllYears() {
    this.yearDropdown.forEach(d => d.checked = true);
    this.filterData();
  }
  uncheckAllYears() {
    this.yearDropdown.forEach(d => d.checked = false);
    this.filterData();
  }

  // checks if filter of year is set
  checkFilterYearsSet() {
    this.yearFilterSet = JSON.stringify(this.yearDropdown) !== JSON.stringify(this.getInitYears())
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

  filterByKeyTopic(keyTopic: string) {
    this.keyTopicFilter = keyTopic;
    this.filterData();
  }

  filterByParty(party: string) {
    this.partyFilter = party;
    this.filterData();
  }

  filterByInstrument(instrument: string) {
    this.instrumentFilter = instrument;
    this.filterData();
  }

  filterBySubCategory(subCategory: string) {
    this.subCategoryFilter = subCategory;
    this.filterData();
  }

  resetFilters() {
    this.searchText = '';
    this.categoryFilter = 'all';
    this.keyTopicFilter = 'all';
    this.yearDropdown = this.getInitYears();
    this.statusFilter = 'all';
    this.partyFilter = 'all';
    this.instrumentFilter = 'all';
    this.filterData();
  }

  resetSearchText() {
    this.searchText = '';
    this.filterData();
  }

  resetCategoryFilter() {
    this.categoryFilter = 'all';
    this.filterData();
  }

  resetKeyTopicFilter() {
    this.keyTopicFilter = 'all';
    this.filterData();
  }

  resetPartyFilter() {
    this.partyFilter = 'all';
    this.filterData();
  }

  resetInstrumentFilter() {
    this.instrumentFilter = 'all';
    this.filterData();
  }

  resetYearFilter() {
    this.yearDropdown = this.getInitYears();
    this.filterData();
  }

  resetStatusFilter() {
    this.statusFilter = 'all';
    this.filterData();
  }

  stopEventPropagation(event) {
    event.stopPropagation();
  }

  private initDropdowns() {
    this.categoryDropdown = this.dataService.unique(this.originalData.map(d => d.Themenbereich));
    this.categoryDropdown.sort((a, b) => a.localeCompare(b));
    this.keyTopicDropdown = this.dataService
      .unique(this.originalData.map(d => d["Schwerpunktthema (bei Bedarf)"]))
      .filter(d => d !== '');
    this.keyTopicDropdown.sort((a, b) => a.localeCompare(b));
    this.partyDropdown = ["BastA!", "CVP", "EVP", "FDP", "GLP", "Grüne", "LDP", "SP", "SVP", "Parteilos", "Kommission", "Bevölkerung"];
    this.instrumentDropdown = ["Petition", "Anzug", "Motion", "Initiative"];
    this.yearDropdown = this.getInitYears();
    this.filterData();
  }

  // gets the original values for years
  // check only last 5 years (if year bigger than 2018)
  private getInitYears() {
    let years = this.dataService.unique(this.originalData.map(d => d.Jahr));
    // sort descending
    years.sort((a, b) => {
      return b - a;
    });
    return years.map((d, i) => {
      let checked = (i < 5 && d > 2014);
      return {
        year: d, checked: checked
      };
    });
  }

  private getDownloadData(): void {
    this.dataService.sendJSON(this.data);
  }

  private getOriginalDownloadData(): void {
    this.dataService.sendOriginalJSON(this.originalData);
  }

}
