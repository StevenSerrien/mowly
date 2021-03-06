import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';

import { HomeComponent }   from './home.component';
import { SearchComponent } from './search/search.component';
import { BusinessComponent } from './business/business.component';
import { SearchResultsComponent } from './searchresults/searchresults.component';
import { CrudPlaceComponent } from './crudplace/crudplace.component';



import { AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthGuardService  } from './services/auth-guard.service';



import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PlaceService } from './services/place.service';
import { FoodService } from './services/food.service';
import { DrinkService } from './services/drink.service';
import { GeolocationService } from './services/geolocation.service';
import { UserService } from './services/user.service';


import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlaceComponent } from './place/place.component';
import { AuthenticationService } from './services/authentication.service';

import { RegisterIndexComponent } from './register/register-index.component';
import { RegisterBusinessComponent } from './register/register-business.component';
import { RegisterMenuComponent } from './register/register-menu.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddPlaceComponent } from "./addplace/addplace.component";
import { TRUNCATE_PIPES } from 'ng2-truncate';
import {enableProdMode} from '@angular/core';
enableProdMode();




@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, ReactiveFormsModule,
    RouterModule.forRoot ([
      { path: '', component: HomeComponent},
      { path: 'business', component: BusinessComponent},
      { path: 'results', component: SearchResultsComponent},
      { path: 'login', component: LoginComponent},
      {
        path: 'register',
        component: RegisterIndexComponent,
        children: [
        { path: '', component: RegisterComponent },
        { path: 'step-2', component: RegisterBusinessComponent },
        { path: 'step-3', component: RegisterMenuComponent },
      ]},
      { path: 'place/:id', component: PlaceComponent},
      { path: 'crudplace', component: CrudPlaceComponent},
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
      { path: 'dashboard/addplace', component: AddPlaceComponent, canActivate: [AuthGuardService]},
    ])],
    declarations: [ AppComponent, HomeComponent, BusinessComponent, SearchResultsComponent, SearchComponent, LoginComponent, RegisterComponent, RegisterIndexComponent, RegisterBusinessComponent, RegisterMenuComponent, PlaceComponent, CrudPlaceComponent, DashboardComponent, AddPlaceComponent, TRUNCATE_PIPES ],
    providers:    [ PlaceService, FoodService, DrinkService, GeolocationService, AuthenticationService, AUTH_PROVIDERS, UserService, AuthGuardService],
    bootstrap:    [ AppComponent ]
  })
  export class AppModule { }
