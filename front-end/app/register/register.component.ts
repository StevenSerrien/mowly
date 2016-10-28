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
  greetmessage = "Your personal account";
  stepnumber = "Step 1";
  model: any = {};
  loading = false;
  token: string;
  errorMessage: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

    ngOnInit() {

    }

    goToNextStepBusiness() {
      // Set our navigation extras object
      // that contains our global query params and fragment

      // Navigate to the login page with extras
      this.router.navigate(['register/step-2']);
      return false;
    }


  }
