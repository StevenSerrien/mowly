import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {AppSettings} from '../appSettings';
import { Place } from '../models/place';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {
  constructor(private http: Http) { }

  sGetAllPlaces() {
    return this.http.get(`${AppSettings.API_ENDPOINT}/places`)
          .map(response => <Place[]>response.json().places);
  }

  sGetPlacesByName(params) {
      return this.http.get(`${AppSettings.API_ENDPOINT}/place/search`, {
          search: params
      }).map(response => <Place[]>response.json().places);
  }

    sGetPlace(id) {
        return this.http.get(`${AppSettings.API_ENDPOINT}/places/`+id).map(response => <Place>response.json().place);
    }

    sGetGeoAndAdress(address) {
        return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyC6szXLklZiZ5VxJHSd6vxBJHVMuzqWW2o&address='+address)
        .map(response => response.json());
    }
}
