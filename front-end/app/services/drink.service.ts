import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Drink } from '../models/drink';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map';

@Injectable()
export class DrinkService {


  constructor(private http: Http){}



  sGetDrinksByName(params) {
      return this.http.get(`${AppSettings.API_ENDPOINT}/drink/search`, {
          search: params
      }).map(response => <Drink[]>response.json().drinks);
  }
}
