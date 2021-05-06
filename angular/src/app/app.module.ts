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
import { AuthService } from './shared/auth.service';
import { FileUploadModule } from 'ng2-file-upload';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DownloadComponent } from './download/download.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


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
        FileUploadModule,
        CommonModule,
        BrowserAnimationsModule,
        AngularFontAwesomeModule,
        NgbModule
    ],
    providers: [
      DataService,
      AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
