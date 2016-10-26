import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) { }

    ngOnInit() {

      // reset login status
      // this.authenticationService.login('stevenserrien@gmail.com', 'test123');
      // this.authenticationService.logout();
      // this.login('edward@edward.edward', '123456789');
    }

    login(email: string, password: string): void {
      email = email.trim();
      if (!email) { return; }
      this.authenticationService.login(email, password)
      .then(data => {
        if(!data){console.log('tis kapot');}
        else {
          this.token = data['token'];
          console.log(data);
        }
      });
    }
  }
