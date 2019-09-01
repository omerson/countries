import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Country } from '../../models/country/country.model';
import { NgbModalRef, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-country-report',
  templateUrl: './country-report.component.html',
  styleUrls: ['./country-report.component.scss']
})
export class CountryReportComponent implements OnInit {
  @Input()country: Country;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  map_ChartOptions: any = {};
  map_ChartData: any = {};
  modalReference: NgbModalRef;

  shortDescription: string;
  faults: string[] = [];
  reportFormValid: boolean = true;

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

  sendReport() {
    this.reportFormValid = this.faults.length !== 0;
    // TODO: compose rault report object and implement service for sending fault report
    // it is not done because fault report endpoint does not exists.
    this.modalService.dismissAll();
  }

  private addFault($event) {
    let propertyFault = $event.toElement.value;
    if (this.faults.includes($event.toElement.value)) {
      this.faults = this.faults.filter(f => f !== propertyFault)
    } else {
      this.faults.push(propertyFault);
    }
  }
}
