import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { DataService } from "../../shared/data.service";
import { Category } from "../../shared/category";
declare const $: any;
declare var jQuery: any;

interface jQuery {
  tooltip(options?: any): any;
}

@Component({
  selector: "app-data-filter",
  templateUrl: "./data-filter.component.html",
  styleUrls: ["./data-filter.component.css"],
})
export class DataFilterComponent
  implements OnInit, AfterViewChecked, OnChanges, AfterViewInit
{
  @Input() data: any[];
  @Output() onFiltered: EventEmitter<any> = new EventEmitter();
  @ViewChild("filter", { static: true }) filterRef: ElementRef;

  parties = this.dataService.getParties().map((party) => party.displayName);
  instruments = [
    "Initiative",
    "Referendum",
    "Motion",
    "Anzug",
    "Petition",
    "Budgetpostulat",
    "Vorgezogenes Budgetpostulat",
    "Resolution",
    "Standesinitiative",
    "Standesreferendum",
    "Planungsanzug",
    "Schriftliche Anfrage",
    "Interpellation",
  ];

  MOBILE_SIZE = 580;
  windowSize;
  isOpen = false;
  searchText = "";
  searchSuggestions = [];
  originalData: any[] = [];
  categoryDropdown: Category[];
  keyTopicDropdown: string[];
  partyDropdown = [];
  instrumentDropdown = [];
  statusDropdown = [];
  yearDropdown = [];
  categoryFilter: Category = { description: "all", number: -1 }; // if categoryFilter is -1, no filter is set
  keyTopicFilter = "all";
  partyFilter = "all";
  instrumentFilter = "all";
  statusFilter = "all";
  filtered = false;
  yearFilterSet = false;
  instrumentFilterSet = false;
  partyFilterSet = false;
  subCategoryFilter = "all";
  subCategoryDropdown: string[];

  // Keep filter/searchbar visible on scrolling
  static scroll() {
    const navHeight = $(".navbar").outerHeight();
    const scrollTop = navHeight - $(window).scrollTop();
    $(".custom-fixed-navbar").css("top", Math.max(scrollTop, 0));
  }

  constructor(private dataService: DataService) {}

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("resize");

    //this.isOpen = (event.target.innerWidth > this.MOBILE_SIZE);
    this.windowSize = window.innerWidth;
    //this.adjustHeight();
  }

  ngOnInit() {
    //this.isOpen = (window.innerWidth > this.MOBILE_SIZE);
    this.windowSize = window.innerWidth;
    window.addEventListener("scroll", DataFilterComponent.scroll, true);
  }

  ngAfterViewChecked(): void {
    DataFilterComponent.scroll();
  }

  ngAfterViewInit(): void {
    this.filterRef.nativeElement.addEventListener("mouseenter", (event) => {
      if (window.innerWidth > 580) {
        $("#filter-legend").show();
        //TODO add animation
      }
      //this.adjustHeight();
    });
    this.filterRef.nativeElement.addEventListener("mouseleave", (event) => {
      if (window.innerWidth > 580) {
        $("#filter-legend").hide();
      }
      //this.adjustHeight();
    });
  }

  ngOnChanges(changes: any) {
    // save originalData when data is loaded the first time
    if (changes.data.currentValue && this.originalData.length === 0) {
      this.originalData = changes.data.currentValue;
      this.initDropdowns();
      this.getOriginalDownloadData();
    }
  }

  // filter on Enter key
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.searchByText();
    }
  }

  searchByText() {
    this.searchSuggestions = this.dataService.findSearchSuggestions(
      this.searchText
    );
    this.filterData();
  }

  searchByTextFromSuggestion(text) {
    this.searchSuggestions = [];
    this.searchText = text;
    this.filterData();
  }

  filterData() {
    //this.adjustHeight();
    this.data = this.originalData;
    if (this.categoryFilter.description !== "all") {
      this.data = this.dataService.filterByCategory(
        this.data,
        this.categoryFilter.description
      );
      if (this.subCategoryFilter !== "all") {
        this.data = this.dataService.filterBySubCategory(
          this.data,
          this.subCategoryFilter
        );
      }
    }
    if (this.keyTopicFilter !== "all") {
      this.data = this.dataService.filterByKeyTopic(
        this.data,
        this.keyTopicFilter
      );
    }
    if (this.statusFilter !== "all") {
      this.data = this.dataService.filterByStatus(this.data, this.statusFilter);
    }
    /*if (this.partyFilter !== 'all') {
      this.data = this.dataService.filterByParty(this.data, this.partyFilter);
    }*/
    /*if (this.instrumentFilter !== 'all') {
      this.data = this.dataService.filterByInstrument(this.data, this.instrumentFilter);
    }*/
    this.data = this.dataService.searchInArrayOfObjects(
      this.data,
      this.searchText
    );
    this.data = this.dataService.filterYears(this.data, this.yearDropdown);
    this.data = this.dataService.filterInstruments(
      this.data,
      this.instrumentDropdown
    );
    this.data = this.dataService.filterParties(this.data, this.partyDropdown);
    console.log(this.data);
    // check if any filter is set.
    this.checkFiltersSet();
    this.filtered =
      this.categoryFilter.description !== "all" ||
      this.keyTopicFilter !== "all" ||
      this.searchText.length > 0 ||
      this.statusFilter !== "all" ||
      this.yearFilterSet ||
      this.partyFilterSet ||
      this.instrumentFilterSet;
    // Has to be done async (not in same digest) to avoid expressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.onFiltered.emit({
        data: this.data,
        categoryFilter: this.categoryFilter.description,
      });
      this.getDownloadData();
    }, 0);
  }

  filterYears(entry: any) {
    entry.checked = !entry.checked;
    this.filterData();
  }

  checkAllYears() {
    this.yearDropdown.forEach((d) => (d.checked = true));
    this.filterData();
  }

  uncheckAllYears() {
    this.yearDropdown.forEach((d) => (d.checked = false));
    this.filterData();
  }

  checkAllParties() {
    this.partyDropdown.forEach((d) => (d.checked = true));
    this.filterData();
  }

  uncheckAllParties() {
    this.partyDropdown.forEach((d) => (d.checked = false));
    this.filterData();
  }

  checkAllInstruments() {
    this.instrumentDropdown.forEach((d) => (d.checked = true));
    this.filterData();
  }

  uncheckAllInstruments() {
    this.instrumentDropdown.forEach((d) => (d.checked = false));
    this.filterData();
  }

  // checks if filter of year is set
  checkFiltersSet() {
    this.yearFilterSet =
      this.yearDropdown.filter((d) => d.checked).length !==
      this.getInitYears().filter((d) => d.checked).length;
    this.instrumentFilterSet =
      this.instrumentDropdown.filter((d) => d.checked).length !==
      this.getInitInstruments().filter((d) => d.checked).length;
    this.partyFilterSet =
      this.partyDropdown.filter((d) => d.checked).length !==
      this.getInitParties().filter((d) => d.checked).length;
  }

  filterStatus(status: string) {
    this.statusFilter = status;
    this.filterData();
  }

  filterByCategoryFromSearch(categoryName) {
    this.searchSuggestions = []; // reset search suggestions, since user found what they needed
    this.searchText = ""; // reset searchtext if user clicked on category suggestion
    this.filterByCategory(false, { description: categoryName, number: 1 });
  }

  removeSuggestions() {
    this.searchSuggestions = []; // reset search suggestions, since user found what they needed
  }

  // first argument is true no filter is set.
  filterByCategory(noFilter: boolean, category?: Category) {
    if (noFilter) {
      this.categoryFilter = { description: "all", number: -1 };
    } else {
      this.categoryFilter = category;
    }
    this.filterData();
    // prepare sub category dropdown
    const allCategories = this.data.map((d) => d["Thema 1"]);
    this.subCategoryDropdown = this.dataService.unique(allCategories);
    this.subCategoryDropdown.sort();
    this.subCategoryFilter = "all";
  }

  filterByKeyTopic(keyTopic: string) {
    this.keyTopicFilter = keyTopic;
    this.filterData();
  }

  filterByParty(entry: any) {
    entry.checked = !entry.checked;
    this.filterData();
  }

  filterByInstrument(entry: any) {
    entry.checked = !entry.checked;
    this.filterData();
  }

  filterBySubCategory(subCategory: string) {
    this.subCategoryFilter = subCategory;
    this.filterData();
  }

  resetFilters() {
    this.searchText = "";
    this.categoryFilter = { description: "all", number: -1 };
    this.keyTopicFilter = "all";
    this.yearDropdown = this.getInitYears();
    this.statusFilter = "all";
    this.partyFilter = "all";
    this.partyDropdown = this.getInitParties();
    this.instrumentFilter = "all";
    this.instrumentDropdown = this.getInitInstruments();
    this.statusDropdown = this.getInitStatus();
    this.filterData();
  }

  resetSearchText() {
    this.searchText = "";
    this.searchSuggestions = [];
    this.filterData();
  }

  resetCategoryFilter() {
    this.categoryFilter = { description: "all", number: -1 };
    this.filterData();
  }

  resetKeyTopicFilter() {
    this.keyTopicFilter = "all";
    this.filterData();
  }

  resetPartyFilter() {
    this.partyDropdown = this.getInitParties();
    this.filterData();
  }

  resetInstrumentFilter() {
    this.instrumentDropdown = this.getInitInstruments();
    this.filterData();
  }

  resetYearFilter() {
    this.yearDropdown = this.getInitYears();
    this.filterData();
  }

  resetStatusFilter() {
    this.statusFilter = "all";
    this.filterData();
  }

  stopEventPropagation(event) {
    event.stopPropagation();
  }

  deleteInstrumentSelection(entry) {
    this.instrumentDropdown.forEach((d) => {
      if (d.name === entry.name) {
        d.checked = false;
      }
    });
    this.filterData();
  }

  deletePartySelection(entry) {
    this.partyDropdown.forEach((d) => {
      if (d.name === entry.name) {
        d.checked = false;
      }
    });
    this.filterData();
  }

  deleteYearSelection(entry) {
    this.yearDropdown.forEach((d) => {
      if (d.name === entry.name) {
        d.checked = false;
      }
    });
    this.filterData();
  }

  allInstrumentsSelected() {
    return (
      this.instrumentDropdown.filter((d) => d.checked).length ===
      this.instrumentDropdown.length
    );
  }

  allYearsSelected() {
    return (
      this.yearDropdown.filter((d) => d.checked).length ===
      this.yearDropdown.length
    );
  }

  allPartiesSelected() {
    return (
      this.partyDropdown.filter((d) => d.checked).length ===
      this.partyDropdown.length
    );
  }

  toggleMobileFilter() {
    this.isOpen = !this.isOpen;
  }

  private initDropdowns() {
    this.categoryDropdown = this.dataService.uniqueCategories(
      this.originalData.map((d) => {
        return {
          description: d["Themenbereich 1"],
          number: d.Themenbereich_Number,
        };
      })
    );
    this.categoryDropdown.sort((a, b) =>
      a.description.localeCompare(b.description)
    );
    this.keyTopicDropdown = this.dataService
      .unique(this.originalData.map((d) => d["Schwerpunktthema (bei Bedarf)"]))
      .filter((d) => d !== "");
    this.keyTopicDropdown.sort((a, b) => a.localeCompare(b));
    this.categoryDropdown = this.getInitCategories();
    this.yearDropdown = this.getInitYears();
    this.partyDropdown = this.getInitParties();
    this.instrumentDropdown = this.getInitInstruments();
    this.statusDropdown = this.getInitStatus();
    this.statusDropdown = this.getInitStatus();
    this.filterData();
  }

  // get the original values for years
  // tick only last 5 years (if year bigger than 2018)
  private getInitYears() {
    const years = this.dataService.unique(
      this.originalData.map((d) => d["Jahr"])
    ); // Jahr
    years.unshift("letztes Quartal");
    // sort descending
    years.sort((a, b) => {
      return b - a;
    });
    return years.map((d) => {
      const checked = d >= new Date().getFullYear() - 1;
      return {
        year: d,
        checked: checked,
      };
    });
  }

  private getInitInstruments() {
    return this.instruments.map((d) => {
      return {
        name: d,
        checked: true,
      };
    });
  }

  private getInitParties() {
    return this.parties.map((d) => {
      return {
        name: d,
        checked: true,
      };
    });
  }

  private getInitStatus() {
    return this.dataService.unique(this.originalData.map((d) => d["Status"]));
  }

  private getInitCategories(): Category[] {
    const categories = this.dataService.getCategories();
    const categoriesAsObj = categories.map((d, i) => {
      return <Category>{ description: d.name, number: i };
    });
    return categoriesAsObj;
  }

  private getDownloadData(): void {
    this.dataService.sendJSON(this.data);
  }

  private getOriginalDownloadData(): void {
    this.dataService.sendOriginalJSON(this.originalData);
  }

  private adjustHeight() {
    $(".invisible-navbar-placeholder").css(
      "height",
      $(".custom-fixed-navbar").outerHeight()
    );
  }
}
