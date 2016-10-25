import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { SearchComponent } from './search/search.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { PlaceService } from './services/place.service';


@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ AppComponent, SearchComponent ],
  providers:    [ PlaceService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
