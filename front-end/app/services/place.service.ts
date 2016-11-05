import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {AppSettings} from '../appSettings';
import { Place } from '../models/place';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class PlaceService {
  constructor(private http: Http,
              private authHttp: AuthHttp) { }

  sGetAllPlaces() {
    return this.http.get(`${AppSettings.API_ENDPOINT}/places`)
        .map(response => <Place[]>response.json().places)
        .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }

  sGetPlacesByName(params) {
    return this.http.get(`${AppSettings.API_ENDPOINT}/place/search`, {
      search: params
    })
        .map(response => <Place[]>response.json().places)
        .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }

  sGetPlace(id) {
    return this.http.get(`${AppSettings.API_ENDPOINT}/places/`+id).map(response => <Place>response.json().place);
  }

  sGetGeoAndAdress(address) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC6szXLklZiZ5VxJHSd6vxBJHVMuzqWW2o&address='+address)
        .map(response => response.json());
  }

  //the observer way
  sAddPlace(name: string, streetname: string, housenumber: string, city: string, country: string, latitude: string, longitude: string): Observable<Place> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.authHttp.post(`${AppSettings.API_ENDPOINT}/place/store`,
        JSON.stringify({name: name, streetname: streetname, housenumber: housenumber, city: city, country: country, latitude: latitude, longitude: longitude}), options)
        .map(response => <Place>response.json().place)
        .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }
}
