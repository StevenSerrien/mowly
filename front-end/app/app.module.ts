import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

import { HomeComponent }   from './home.component';
import { SearchComponent } from './search/search.component';
import { BusinessComponent } from './business/business.component';
import { SearchResultsComponent } from './searchresults/searchresults.component';


import { AUTH_PROVIDERS } from 'angular2-jwt';

import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { PlaceService } from './services/place.service';
import { FoodService } from './services/food.service';
import { DrinkService } from './services/drink.service';
import { GeolocationService } from './services/geolocation.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlaceComponent } from './place/place.component';
import { AuthenticationService } from './services/authentication.service';




@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot ([
      { path: '', component: HomeComponent},
      { path: 'business', component: BusinessComponent},
      { path: 'results', component: SearchResultsComponent},
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'place/:id', component: PlaceComponent},
    ])],
    declarations: [ AppComponent, HomeComponent, BusinessComponent, SearchResultsComponent, SearchComponent, LoginComponent, RegisterComponent, PlaceComponent ],
    providers:    [ PlaceService, FoodService, DrinkService, GeolocationService, AuthenticationService, AUTH_PROVIDERS],
    bootstrap:    [ AppComponent ]
  })
  export class AppModule { }
