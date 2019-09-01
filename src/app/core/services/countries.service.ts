import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
    this.httpHeaders = this.httpHeaders.append('Content-Type', 'application/json; charset=UTF-8');
  }

  private httpHeaders: HttpHeaders = new HttpHeaders();
  private countriesBaseURL: string = 'https://restcountries.eu/rest/v2/';

  getCountries(searchParam: string = "all"): Observable<any> {
    let url = this.countriesBaseURL + 'all';
    url = url + '?fields=name;timezones;currencies;languages;population;flag;alpha3Code;borders'

    return this.http.get(url)
      .pipe(
        map((response: Response) => {
          if (response) {
            return response
          } else {
            return [];
          }
        })
      );
    }
}
