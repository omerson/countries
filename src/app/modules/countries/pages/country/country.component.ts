import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from '../../models/country/country.model';
import { NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryReportComponent } from '../countryreport/country-report.component';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @Input()country: Country;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  map_ChartOptions: any = {};
  map_ChartData: any = {};
  modalReference: NgbModalRef;

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal){
  }

  ngOnInit() {
    this.map_ChartOptions.chartType = "GeoChart";

    this.map_ChartOptions = {
      width: 600,
      height: 300,
      chartArea: {left:10,top:10,bottom:0,height:"100%"},
      colorAxis: {colors: ['#aec7e8', '#1f77b4']},
      displayMode: 'regions'
    };

    this.map_ChartData = [
      ['Country'],
      [this.country.name]
    ];
  }

  openCountry(countrName) {
    this.passEntry.emit(countrName);
  }

  reportData() {
    this.modalService.dismissAll();
    this.modalReference = this.modalService.open(CountryReportComponent, { size: 'lg' });
    this.modalReference.componentInstance.country = this.country;
    this.modalReference.result
      .then((result) => {
        console.log(result);
      }, (reason) => {
        console.log(reason);
      });
  }
}
