import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService }  from "../services/user.service";
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {
  constructor(private router: Router, private http: Http, private userService: UserService) { }
  // private headers = new Headers({'Content-Type': 'application/json'});
  token: string;
  errorMessage: string;


  // //the promise way
  // login(gemail: string, gpassword: string): Promise<string> {
  //   console.log(gemail + ' ' + gpassword);
  //   return this.http
  //   .post(`${AppSettings.API_ENDPOINT}/auth/login`, JSON.stringify({email: gemail, password: gpassword}), {headers: this.headers})
  //   .toPromise()
  //   .then(res => res.json())
  //   .catch(this.handleError);
  // }

  //the observer way
  register(gname: string, gemail: string, gpassword: string): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${AppSettings.API_ENDPOINT}/auth/signup`, JSON.stringify({email: gemail, password: gpassword, name: gname}), options)
        .map((response: Response) => {
          // register successful if there's a jwt token in the response
          if (response.json().hasOwnProperty("token")) {
            let token = response.json().token;
            this.token = token;
            localStorage.setItem('id_token', token);
            //return true that register was succesfull
            this.userDataToLocalStorage();
            return true;
          } else {
            return false;
          }
        })
        .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }


  login (gemail: string, gpassword: string): Observable<boolean> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${AppSettings.API_ENDPOINT}/auth/login`, JSON.stringify({email: gemail, password: gpassword}), options)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let token = response.json().token;
          if (token == 0) {
            // return false to indicate failed login
            return false;
          } else {
            // // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('id_token', token);
            this.userDataToLocalStorage();

            // return true to indicate successful login
            return true;

          }
        })
        .catch((error:any) => Observable.throw(error.json().errors[0] || 'Server error'));
  }

  userDataToLocalStorage(){
    this.userService.sGetLoggedInUserData()
        .subscribe(user => {
              //put fetched user data in local storage.
              localStorage.setItem('user', JSON.stringify(user));
              this.userService.userData();
            },
            err => {
              // user fetch failed
              this.errorMessage = err;
              alert(this.errorMessage);
            });
  }

  loggedIn() {
    return tokenNotExpired();
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('id_token');
    localStorage.removeItem('user');
    this.router.navigate(['/']);

  }
}
