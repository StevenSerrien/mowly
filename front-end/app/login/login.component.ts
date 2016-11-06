import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import {UserService} from "../services/user.service";

@Component({
  //moduleId: module.id,
  selector: 'login-component',
  templateUrl: 'app/login/login.component.html',
  styleUrls:['app/login/login.component.css'],
})

export class LoginComponent {
  model: any = {};
  loading = false;
  token: string;
  errorMessage: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

    ngOnInit() {

      // reset login status
      // this.authenticationService.login('stevenserrien@gmail.com', 'test123');
      // this.authenticationService.logout();
      // this.login('edward@edward.edward', '123456789');
    }

    // //the promise way
    //
    // login(email: string, password: string): void {
    //   email = email.trim();
    //   if (!email) { return; }
    //   this.authenticationService.login(email, password)
    //   .then(data => {
    //     if(!data){console.log('tis kapot');}
    //     else {
    //       this.token = data['token'];
    //       console.log(data);
    //     }
    //   });
    // }

    //the observer way

    login(email: string, password: string){

      this.authenticationService.login(email, password)
      .subscribe(result => {
        if (result === true) {
          this.errorMessage = null;
          this.loading = true;
          // login successful
          //this.token = this.authenticationService.token;

          //var token = localStorage.getItem('id_token');

          // this.userService.sGetLoggedInUserData()
          //     .subscribe(user => {
          //           //put fetched user data in local storage.
          //           localStorage.setItem('user', JSON.stringify(user));
          //           this.router.navigate(['dashboard']);
          //           this.loading = false;
          //         },
          //         err => {
          //           // user fetch failed
          //           this.errorMessage = err;
          //           alert(this.errorMessage);
          //           this.loading = false;
          //         });


        } else {
          // login failed
          this.errorMessage = 'Username or password is incorrect';
          this.loading = false;
        }
      });
    }
  }
