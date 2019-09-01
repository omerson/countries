import { Component, OnInit, OnDestroy } from '@angular/core';
import { Country } from '../../models/country/country.model';
import { CountriesService } from '../../../../core/services/countries.service';
import { SearchService } from '../../../../core/services/search.service';
import { CountryComponent } from '../../pages/country/country.component';
import { Subscription } from 'rxjs';
import { PREPARE_COUNTRIES, SEARCH_COUNTRIES, SORT_COUNTRIES } from '../../../../core/actions/actions';
import { NgRedux } from 'ng2-redux';
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModalRef, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IAppState } from '../../../../core/store/store';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, OnDestroy {

  countries: Country[];
  countriesOriginal: Country[];
  subscription: Subscription;
  modalReference: NgbModalRef;
  sortedProperty: string;
  sortedDesc: boolean;
  country: Country;

  constructor(private countriesService: CountriesService,
              private searchService: SearchService,
              private ngRedux: NgRedux<IAppState>,
              private spinner: NgxSpinnerService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.subscription = this.searchService.getSearchParam()
      .subscribe((seachParam: any) => {
        seachParam = seachParam && seachParam.text ? seachParam.text.trim() : '';
        this.ngRedux.dispatch({ type: SEARCH_COUNTRIES, payload: { searchParam: seachParam, countries: this.countriesOriginal } });
      });

    this.spinner.show();
    this.countriesService.getCountries()
      .subscribe((data) => {
        this.spinner.hide();
        this.countriesOriginal = data;
        this.ngRedux.dispatch({ type: PREPARE_COUNTRIES, payload: { countries: data } })
      });

    this.ngRedux.subscribe(() => {
      let state = this.ngRedux.getState();
      this.countries = state.countries.map(this.prepareCountry)
      this.sortedProperty = state.countriesSortProperty;
      this.sortedDesc = state.countriesSortDesc; 
    });
  }

  sortCountries(propertyToSort: string) {
    this.ngRedux.dispatch({ type: SORT_COUNTRIES, payload: { propertyToSort: propertyToSort, countries: this.countries } });
  }

  openCountry(countryDetails, name) {
    this.modalService.dismissAll();
    this.country = this.countries.find(b => b.name === name);
    this.country.borderCountries = this.getCountryBorders();
    this.modalReference = this.modalService.open(CountryComponent, { size: 'lg' });
    this.modalReference.componentInstance.country = this.country;
    this.modalReference.result
      .then((result) => {
        console.log(result);
      }, (reason) => {
        console.log(reason);
      });

    this.modalReference.componentInstance.passEntry
      .subscribe((receivedEntry) => {
        this.openCountry(countryDetails, receivedEntry);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private prepareCountry(country:any) {
    return {
      ...country,
      borderCountries: []
    } as Country;
  }

  private getCountryBorders() {
    return this.countries.reduce((b: any[], c) => {
      if (this.country.borders.includes(c.alpha3Code)) {
        b.push(c.name);
      }
      return b;
    }, []);
  }
}
