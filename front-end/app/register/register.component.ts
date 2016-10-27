import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  //moduleId: module.id,
  selector: 'register-component',
  templateUrl: 'app/register/register.component.html',
  styleUrls:['app/register/register.component.css'],
})

export class RegisterComponent {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }

  }
