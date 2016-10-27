import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

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
    private authenticationService: AuthenticationService) { }

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
      this.loading = true;
      this.authenticationService.login(email, password)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.token = this.authenticationService.token;
          // this.router.navigate(['/']);
          this.loading = false;

          var token = localStorage.getItem('id_token');
          console.log(
            this.jwtHelper.decodeToken(token),
            this.jwtHelper.getTokenExpirationDate(token),
            this.jwtHelper.isTokenExpired(token)
          );

        } else {
          // login failed
          this.errorMessage = 'Username or password is incorrect';
          this.loading = false;
        }
      });
    }
  }
