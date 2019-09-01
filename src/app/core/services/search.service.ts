import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private subject = new Subject<any>();

  sendSearchParam(seachParam: string) {
      this.subject.next({ text: seachParam });
  }

  clearSearchParams() {
      this.subject.next();
  }

  getSearchParam(): Observable<any> {
      return this.subject.asObservable();
  }
}
