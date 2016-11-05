import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Food } from '../models/food';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class FoodService {


  constructor(private http: Http,
  private authHttp: AuthHttp){}

  getAllFoods() {
    // http get from api then tell TS compiler to treat this as Food[] array then parse the string to json
    //and the array we want is under the foods keyword
    return this.http.get(`${AppSettings.API_ENDPOINT}/foods`)
        .map(response => <Food[]>response.json().foods)
        .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }

  sGetFoodsByName(params) {
      return this.http.get(`${AppSettings.API_ENDPOINT}/food/search`, {
          search: params
      })
          .map(response => <Food[]>response.json().foods)
          .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }

    sGetFoodsByNameWithLocation(params) {
        return this.http.get(`${AppSettings.API_ENDPOINT}/food/searchwithlocation`, {
            search: params
        })
            .map(response => <Food[]>response.json().data);
          //  .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }

  //the observer way
  sAddFood(name: string, description: string, price: number, place_id: number): Observable<Food> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.post(`${AppSettings.API_ENDPOINT}/food/store`,
      JSON.stringify({name: name, description: description, price: price, place_id: place_id}), options)
    .map(response => <Food>response.json().food)
    .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }
}
