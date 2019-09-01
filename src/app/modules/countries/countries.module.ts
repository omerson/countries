
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CountriesService } from '../../core/services/countries.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GoogleChart } from '../../core/directives/angular2-google-chart.directive';

import { CountriesComponent } from './pages/countries/countries.component';
import { CountryComponent } from './pages/country/country.component';
import { CountryReportComponent } from './pages/countryreport/country-report.component';

@NgModule({
    declarations: [
        CountriesComponent,
        CountryComponent,
        CountryReportComponent,
        GoogleChart
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      NgxSpinnerModule,
      NgbModule
      
    ],
    providers: [
      CountriesService,
      NgbActiveModal
    ],
    exports: [ 
        CountriesComponent,
        CountryComponent,
        CountryReportComponent,
    ],
    bootstrap: [CountriesComponent, CountryComponent, CountryReportComponent]
  })
  export class CountriesModule { }