import {Component, EventEmitter, Input, OnInit, Output, ViewChildren} from '@angular/core';

@Component({
    selector: 'app-materialize-table',
    templateUrl: './materialize-table.component.html',
    styleUrls: ['./materialize-table.component.css']
})
export class MaterializeTableComponent implements OnInit {
    @Input() data: Array<any>;
    @Input() title: string;
    @Input() initialSortBy: string;

    @Output() selectEntryEvent = new EventEmitter();

    dataAfterFilter: Array<any>;
    searchString = '';
    pagination = {
        start: 0,
        end: 0,
        numberOfEntries: 20,
        numberPages: 0
    };
    sort = {
        sortBy: '',
        asc: false
    };

    constructor() {
    }

    ngOnInit() {
        this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
        this.pagination.numberPages = Math.ceil(this.data.length / this.pagination.numberOfEntries);
        this.sort.sortBy = this.initialSortBy;
        this.dataAfterFilter = this.data;
    }

    filterData(searchTerm: string) {
        const list = this.data;
        const result = [];
        if (typeof list === 'undefined' || typeof searchTerm === 'undefined' || searchTerm === '')
            this.dataAfterFilter = this.data;

        let found: boolean;
        for (let entry of list) {
            found = false;
            for(let key in entry) {
                if (entry.hasOwnProperty(key)) {
                    // debugger;
                    if (entry[key] !== null && entry[key].toString().toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1) {
                        found = true;
                    }
                }
            }
            if (found) {
                result.push(entry)
            }
        }
        this.dataAfterFilter = result;
        this.setPaginationToStart();
        // if result length is smaller than numberOfEntries, we have to adapt pagination end
        this.pagination.end = Math.min(this.pagination.end + this.pagination.numberOfEntries, this.dataAfterFilter.length);
    }

    pageBack() {
        if (this.pagination.start !== 0) {
            this.pagination.start = Math.max(this.pagination.start - this.pagination.numberOfEntries, 0);
            this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
        }
    }

    pageUp() {
        if (this.pagination.end !== this.dataAfterFilter.length) {
            this.pagination.start = this.pagination.start + this.pagination.numberOfEntries;
            this.pagination.end = Math.min(this.pagination.end + this.pagination.numberOfEntries, this.dataAfterFilter.length);
        }
    }

    changeSortBy(col: string) {
        // change direction if second click on same col
        if (this.sort.sortBy === col) {
            this.sort.asc = !this.sort.asc;
        // change filter
        } else {
            this.sort.sortBy = col;
            this.sort.asc = false;
        }
    }

    setPaginationToStart() {
        this.pagination.start = 0;
        this.pagination.end = this.pagination.numberOfEntries;
    }

    selectEntry(entry) {
      this.selectEntryEvent.emit(entry);
    }
}
