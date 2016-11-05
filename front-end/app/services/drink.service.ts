import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Drink } from '../models/drink';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class DrinkService {


  constructor(private http: Http,
    private authHttp: AuthHttp){}



  sGetDrinksByName(params) {
      return this.http.get(`${AppSettings.API_ENDPOINT}/drink/search`, {
          search: params
      })
          .map(response => <Drink[]>response.json().drinks)
          .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }

    sGetDrinksByNameWithLocation(params) {
        return this.http.get(`${AppSettings.API_ENDPOINT}/drink/searchwithlocation`, {
            search: params
        })
            .map(response => <Drink[]>response.json().data);
            // .catch((error:any) => Observable.throw(error.json() || 'Server error'));
    }

    //the observer way
    sAddDrink(name: string, description: string, price: number, place_id: number): Observable<Drink> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.authHttp.post(`${AppSettings.API_ENDPOINT}/drink/store`,
            JSON.stringify({name: name, description: description, price: price, place_id: place_id}), options)
            .map(response => <Drink>response.json().drink)
            .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
    }
}
