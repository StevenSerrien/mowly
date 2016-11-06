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
    detailsSectionState: string;  //states 'viewdetails' or 'editpassword' or 'editdetails'


    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.detailsSectionState = 'viewdetails';
        this.getLoggedInUserData();

    }

    getLoggedInUserData(){
        this.userService.sGetLoggedInUserData()
            .subscribe(user => {
                    //put fetched user data in local storage.
                    localStorage.setItem('user', JSON.stringify(user));
                    this.user = user;
                    this.model.name = user.name;
                    this.model.email = user.email;
                    //check if there are no places for this person
                    if (user.places.length === 0) {
                        this.router.navigate(['register/step-2']);
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

    changeState(state: string){
        this.detailsSectionState = state;
        this.errorMessage = null;
        console.log(this.detailsSectionState);
    }

    changeUserDetails(){
        this.loading = true;
        this.userService.changeUserDetails(this.model.email, this.model.name)
            .subscribe(response => {
                    this.getLoggedInUserData();
                    this.changeState('viewdetails');
                    this.loading = false;
                },
                err => {
                    // user change failed
                    this.errorMessage = err;
                    //alert(this.errorMessage);
                    this.user = JSON.parse(localStorage.getItem('user'));
                    this.model.name = this.user.name;
                    this.model.email = this.user.email;
                });
    }
    changeUserPassword(){
        this.loading = true;
        this.userService.changeUserPassword(this.model.old_password, this.model.new_password)
            .subscribe(response => {
                    this.getLoggedInUserData();
                    this.changeState('viewdetails');
                    this.loading = false;
                    this.model.old_password = null;
                    this.model.new_password = null;
                },
                err => {
                    // password change failed
                    this.errorMessage = err;
                    //alert(this.errorMessage);
                    this.model.old_password = null;
                    this.model.new_password = null;
                    this.loading = false;
                });
    }

}
