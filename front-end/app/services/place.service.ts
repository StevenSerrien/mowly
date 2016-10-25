import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
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

}
