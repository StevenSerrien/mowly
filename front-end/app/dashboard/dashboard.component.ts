import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from '../services/user.service';

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


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userservice: UserService) { }

    ngOnInit() {
      



    }
  }
