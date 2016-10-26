import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Food } from '../models/food';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map';

@Injectable()
export class FoodService {


  constructor(private http: Http){}

  getAllFoods() {
    // http get from api then tell TS compiler to treat this as Food[] array then parse the string to json
    //and the array we want is under the foods keyword
    return this.http.get(`${AppSettings.API_ENDPOINT}/foods`).map(response => <Food[]>response.json().foods);
  }

  sGetFoodsByName(params) {
      return this.http.get(`${AppSettings.API_ENDPOINT}/food/search`, {
          search: params
      }).map(response => <Food[]>response.json().foods);
  }
}
