import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from '../models/user';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';



@Injectable()
export class UserService {
    constructor(private router: Router, private http: Http,
    private authHttp: AuthHttp) { }
    user: User;



    sGetLoggedInUserData() {
      return this.authHttp.get(`${AppSettings.API_ENDPOINT}/user/getloggedin`)
      .map(response => <User[]>response.json().user)
      .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
    }

    userData(){
      if (tokenNotExpired()) {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user);
        return this.user;
      }
      else{this.logout();}
    }

    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('id_token');
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('id_token'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
