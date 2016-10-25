import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Place } from '../models/place';
import 'rxjs/add/operator/map';

@Injectable()
export class PlaceService {
  constructor(private http: Http) { }

  getPlaces() {
    return this.http.get('http://mowly-backend.dev/api/places')
          .map(response => <Place[]>response.json());
  }

}
