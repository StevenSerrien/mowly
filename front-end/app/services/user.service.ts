import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {AppSettings} from '../appSettings';

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    //Dummy functions
    storePlaceByUser(name, streetname, housenumber, city, country, latitude, longitude) {

        return this.http.post(`${AppSettings.API_ENDPOINT}/place/store`,
          JSON.stringify({
            name: name,
            streetname: streetname,
            housenumber: housenumber,
            city: city,
            country: country,
            latitude: latitude,
            longitude: longitude}), this.jwt())
        .map((response: Response) => response.json());
    }

    



    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
