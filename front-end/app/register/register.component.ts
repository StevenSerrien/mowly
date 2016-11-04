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
  loading = false;
  token: string;
  errorMessage: string;
  email: string;
  password: string;
  name: string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

    ngOnInit() {
      if (this.authenticationService.loggedIn()) {
          this.router.navigate(['register/step-2']);
      } 
    }

    // goToNextStepBusiness() {
    //   // Set our navigation extras object
    //   // that contains our global query params and fragment
    //
    //   // Navigate to the login page with extras
    //   this.router.navigate(['register/step-2']);
    //   return false;
    // }

    register(){
      this.loading = true;
      this.authenticationService.register(this.name, this.email, this.password)
      .subscribe(result => {
        if (result === true) {
          // register successful
          this.token = this.authenticationService.token;

          this.loading = false;
          this.router.navigate(['register/step-2']);

        }
      },
      err => {

          // register failed
          this.errorMessage = err;
          alert(this.errorMessage);
          this.loading = false;

      });
    }
  }
