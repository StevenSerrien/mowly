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

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.login('stevenserrien@gmail.com', 'test123');
        //this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['']);
                },
                error => {

                    this.loading = false;
                });
    }
}
