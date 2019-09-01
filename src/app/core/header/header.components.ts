import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(private searchService: SearchService) { }

  sendMessage(searchParam): void {
      this.searchService.sendSearchParam(searchParam);
  }

  clearMessages(): void {
      this.searchService.clearSearchParams();
  }

  ngOnInit() {
    let input = document.getElementById('searchInput');
    let input$ = fromEvent(input, 'keyup')
                    .pipe(
                        map(x => x.currentTarget['value']),
                        debounceTime(500)
                    );

    input$.subscribe((x) => this.sendMessage(x));
  }
}