import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  //moduleId: module.id,
  selector: 'register-menu-component',
  templateUrl: 'app/register/register-menu.component.html',
  styleUrls:['app/register/register.component.css'],
})

export class RegisterMenuComponent {

  greetmessage = "Awesome! Now it's time to add your menucard";
  stepnumber = "Step 3";
  model: any = {};
  loading = false;
  token: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }

  }
