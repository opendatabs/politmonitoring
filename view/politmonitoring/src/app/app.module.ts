import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {AppRoutingModule} from "./app-routing.module";
import { MainComponent } from './main/main.component';
import { UploadComponent } from './upload/upload.component';
import {MaterializeTableModule} from "./materialize-table/materialize-table.module";
import {HttpClientModule} from "@angular/common/http";
import {DataService} from "./shared/data.service";


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MainComponent,
        UploadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MaterializeTableModule,
        HttpClientModule
    ],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
