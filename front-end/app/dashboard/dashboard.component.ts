import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from '../services/user.service';
import { Place } from '../models/place';
import { User } from '../models/user'
import {AppSettings} from "../appSettings";

@Component({
  //moduleId: module.id,
  selector: 'dashboard-component',
  templateUrl: 'app/dashboard/dashboard.component.html',
  styleUrls:['app/dashboard/dashboard.component.css'],
})

export class DashboardComponent {
  model: any = {};
  loading = false;
  token: string;
  errorMessage: string;
  jwtHelper: JwtHelper = new JwtHelper();
  places: Place[];
  user: User;
  base_url: string;


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

    ngOnInit() {
      this.loading = true;
      this.userService.sGetLoggedInUserData()
          .subscribe(user => {
                //put fetched user data in local storage.
                localStorage.setItem('user', JSON.stringify(user));
                this.user = user;
                //check if there are no places for this person
                if (user.places.length === 0) {
                  this.router.navigate(['register/step-2']);
                }
                if (user.places.length === 1) {
                  this.router.navigate(['register/step-3']);
                }
                else {
                  this.places = this.user.places;
                  this.base_url = AppSettings.BASE_URL;
                  this.loading = false;

                }
              },
              err => {
                // user fetch failed
                this.errorMessage = err;
                alert(this.errorMessage);
              });
    }

  onSelect(place: Place) {
    this.router.navigate(['/place', place.id]);
  }

  }
