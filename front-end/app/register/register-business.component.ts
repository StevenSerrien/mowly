import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';

@Component({
  //moduleId: module.id,
  selector: 'register-business-component',
  templateUrl: 'app/register/register-business.component.html',
  styleUrls:['app/register/register.component.css'],
})

export class RegisterBusinessComponent {

  greetmessage = "Great! Let's create your first business";
  stepnumber = "Step 2";
  model: any = {};
  loading = false;
  token: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }

    goToNextStepMenu() {

      this.router.navigate(['register/step-3']);
      return false;
    }

  }
