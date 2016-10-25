import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

import { HomeComponent }   from './home.component';
import { SearchComponent } from './search/search.component';
import { BusinessComponent } from './business/business.component';


import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { PlaceService } from './services/place.service';


@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot ([
      { path: '', component: HomeComponent},
      { path: 'business', component: BusinessComponent},
    ])],
    declarations: [ AppComponent, HomeComponent, BusinessComponent, SearchComponent ],
    providers:    [ PlaceService ],
    bootstrap:    [ AppComponent ]
  })
  export class AppModule { }
