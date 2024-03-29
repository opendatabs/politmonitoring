import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BootstrapTableModule } from './shared/bootstrap-table/bootstrap-table.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './shared/data.service';
import { BubbleChartComponent } from './main/bubble-chart/bubble-chart.component';
import { DataFilterComponent } from './main/data-filter/data-filter.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DownloadComponent } from './download/download.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        MainComponent,
        BubbleChartComponent,
        DataFilterComponent,
        DownloadComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BootstrapTableModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        BrowserAnimationsModule,
        NgbModule,
        FontAwesomeModule
    ],
    providers: [
      DataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
