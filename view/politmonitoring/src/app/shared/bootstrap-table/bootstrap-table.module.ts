import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BootstrapTableComponent} from './bootstrap-table.component';
import {KeysPipe} from './pipes/keys.pipe';
import {SortByPipe} from './pipes/sort-by.pipe';
import {HighlightPipe} from './pipes/highlight.pipe';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
    ],
    exports: [
        BootstrapTableComponent,
        KeysPipe,
        SortByPipe,
        HighlightPipe
    ],
    declarations: [
        BootstrapTableComponent,
        KeysPipe,
        SortByPipe,
        HighlightPipe
    ]
})
export class BootstrapTableModule {
}
