import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChildren} from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-bootstrap-table',
    templateUrl: './bootstrap-table.component.html',
    styleUrls: ['./bootstrap-table.component.css']
})
export class BootstrapTableComponent implements OnInit, OnChanges {
    @Input() data: Array<any>;
    @Input() title: string;
    @Input() initialSortBy: string;

    @Output() selectEntryEvent = new EventEmitter();

    admin: boolean;
    searchString = '';
    pagination = {
        start: 0,
        end: 0,
        numberOfEntries: 25,
        numberPages: 0
    };
    sort = {
        sortBy: '',
        asc: false
    };

    constructor(private authService: AuthService) {
    }

    ngOnChanges(changes: any) {
      if (changes.data && changes.data.currentValue) {
        this.toStart();
      }
    }

    ngOnInit() {
      this.authService.currentAdminState.subscribe(admin => {this.admin = admin; });
      this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
      this.pagination.numberPages = Math.ceil(this.data.length / this.pagination.numberOfEntries);
      this.sort.sortBy = this.initialSortBy;
    }

    // sets pagination to start. calculates number of pages and end
    toStart() {
      this.pagination.start = 0;
      this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
      this.pagination.numberPages = Math.ceil(this.data.length / this.pagination.numberOfEntries);
    }

    selectNumberOfEntries(value: string) {
      this.pagination.numberOfEntries = parseInt(value);
      this.toStart();
    }

    pageBack() {
        if (this.pagination.start !== 0) {
            this.pagination.start = Math.max(this.pagination.start - this.pagination.numberOfEntries, 0);
            this.pagination.end = this.pagination.start + this.pagination.numberOfEntries;
        }
    }

    pageUp() {
        if (this.pagination.end !== this.data.length) {
            this.pagination.start = this.pagination.start + this.pagination.numberOfEntries;
            this.pagination.end = Math.min(this.pagination.end + this.pagination.numberOfEntries, this.data.length);
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

    selectEntry(entry) {
      this.selectEntryEvent.emit(entry);
    }
}
