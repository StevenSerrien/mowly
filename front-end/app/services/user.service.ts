import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from '../models/user';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class UserService {
    constructor(private http: Http,
    private authHttp: AuthHttp) { }

    // //Dummy functions
    // storePlaceByUser(name, streetname, housenumber, city, country, latitude, longitude) {
    //
    //     return this.http.post(`${AppSettings.API_ENDPOINT}/place/store`,
    //       JSON.stringify({
    //         name: name,
    //         streetname: streetname,
    //         housenumber: housenumber,
    //         city: city,
    //         country: country,
    //         latitude: latitude,
    //         longitude: longitude}), this.jwt())
    //     .map((response: Response) => response.json());
    // }


    sGetLoggedInUserData() {
      return this.authHttp.get(`${AppSettings.API_ENDPOINT}/user/getloggedin`)
      .map(response => <User[]>response.json().user);
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
