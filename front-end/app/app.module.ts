import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

import { HomeComponent }   from './home.component';
import { SearchComponent } from './search/search.component';
import { BusinessComponent } from './business/business.component';
import { SearchResultsComponent } from './searchresults/searchresults.component';


import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { PlaceService } from './services/place.service';
import { GeolocationService } from './services/geolocation.service';



@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot ([
      { path: '', component: HomeComponent},
      { path: 'business', component: BusinessComponent},
      { path: 'results', component: SearchResultsComponent},
    ])],
    declarations: [ AppComponent, HomeComponent, BusinessComponent, SearchResultsComponent, SearchComponent ],
    providers:    [ PlaceService, GeolocationService ],
    bootstrap:    [ AppComponent ]
  })
  export class AppModule { }
