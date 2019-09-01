import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgReduxModule, NgRedux } from 'ng2-redux';
import { IAppState, rootReducer, INITIAL_STATE } from '../../core/store/store'

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { CountriesModule } from '../countries/countries.module';
import { HeaderComponent } from 'src/app/core/header/header.components';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HomeRoutingModule,
    CountriesModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule {
  constructor(ngRedux: NgRedux<IAppState>) {
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
