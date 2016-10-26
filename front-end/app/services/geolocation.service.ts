
import { Injectable } from '@angular/core';

/**
* GeolocationService class.
* https://developers.google.com/maps/documentation/javascript/
* https://dev.w3.org/geo/api/spec-source.html
*
* @author Roberto Simonetti
*/
@Injectable() export class GeolocationService {

  constructor() { }

  getCurrentPosition(){

    // Invokes getCurrentPosition method of Geolocation API.
    navigator.geolocation.getCurrentPosition(

      // Success callback.
      (position: Position) => {
        console.log('Latitude: ' + position.coords.latitude);
        console.log('Longitude: ' + position.coords.longitude);
      },
      // Error callback.
      (error: PositionError) => {
        console.log('Geolocation service: ' + error.message);
      }
    );
  }
}
