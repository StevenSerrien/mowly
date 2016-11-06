
import { Injectable } from '@angular/core';
import {Headers, RequestOptions, Http} from "@angular/http";
import {AppSettings} from '../appSettings';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class GeolocationService {

  constructor(private http: Http) { }

    latitude: string;
    longitude: string;
    lat: string;
    lng: string;

  sGetCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      // Success callback.
      (position: Position) => {
        console.log('Latitude: ' + position.coords.latitude);
        console.log('Longitude: ' + position.coords.longitude);
          this.latitude = position.coords.latitude.toString();
          this.longitude = position.coords.longitude.toString();
          sessionStorage.setItem('latitude', this.latitude);
          sessionStorage.setItem('longitude', this.longitude);
      },
      // Error callback.
      (error: PositionError) => {
        console.log('Geolocation service: ' + error.message);
          this.sGetCurrentLocationGMaps().subscribe(data => {
              this.latitude = <string>data.lat;
              this.longitude = <string>data.lng;
              console.log('Latitude: ' + this.latitude);
              console.log('Longitude: ' + this.longitude);
              sessionStorage.setItem('latitude', this.latitude);
              sessionStorage.setItem('longitude', this.longitude);
          });
      }
    );
  }
    // Invokes getCurrentPosition method of Geolocation API.
    //the observer way
    sGetCurrentLocationGMaps(){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${AppSettings.GOOGLE_API_KEY}`,'',options)
            .map(response => <any>response.json().location)
            .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
    }
}
