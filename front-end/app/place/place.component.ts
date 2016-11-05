import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { PlaceService } from '../services/place.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { Place } from '../models/place';


@Component({
  selector: 'place-component',
  templateUrl: 'app/place/place.component.html',
  styleUrls:['app/place/place.component.css'],
})

export class PlaceComponent {
  loading = false;
  token: string;
  place: Place;
  errorMessage: string;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private placeservice: PlaceService) {}

    ngOnInit() {
      this.loading = true;
      this.route.params.forEach((params: Params) => {
        let id = +params['id']; // (+) converts string 'id' to a number
        this.placeservice.sGetPlace(id).subscribe(place => {
          this.place = place;
          this.loading = false;
        },
            err => {

              // Place fetch failed failed
              this.errorMessage = err;
              alert(this.errorMessage);
              this.loading = false;

            });
      });

    }
  }
