import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
import {AppSettings} from '../appSettings';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
  constructor(private http: Http) { }
  private headers = new Headers({'Content-Type': 'application/json'});


  login(gemail: string, gpassword: string): Promise<string> {
    console.log(gemail + ' ' + gpassword);
    return this.http
    .post(`${AppSettings.API_ENDPOINT}/auth/login`, JSON.stringify({email: gemail, password: gpassword}), {headers: this.headers})
    .toPromise()
    .then(res => res.json())
    .catch(this.handleError);
  }

  private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
}

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
