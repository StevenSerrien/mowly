import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { PlaceService } from '../services/place.service';
import { GeolocationService } from '../services/geolocation.service';
import { Place } from '../models/place';
import { UserService } from '../services/user.service';



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
  mapsresponse: any;
  streetname: string;
  housenumber: string;
  city: string;
  latitude: string;
  longitude: string;
  country: string;
  name: string;
  place: Place;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private placeService: PlaceService,
    private userService: UserService) { }

    ngOnInit() {


      //check if there are no places for this person
      if (this.userService.userData()) {
        if (Object.keys(this.userService.user.places).length === 0) {

        } else {
          this.router.navigate(['register/step-3']);
        }
      }
    }

    // goToNextStepMenu() {
    //
    //   this.router.navigate(['register/step-3']);
    //   return false;
    // }

    //via google maps api
    getAddress(address){
      this.placeService.sGetGeoAndAdress(address)
      .subscribe(data => this.mapData(data));
    }

    //fill variables from maps data api
    mapData(data){
      if(data.status == 'OK'){
        this.latitude = data.results[0].geometry.location.lat;
        this.longitude = data.results[0].geometry.location.lng;
        for (let e of data.results[0].address_components) {
          switch(e.types[0]){
            case "street_number":
            this.housenumber = e.long_name;
            break;
            case "route":
            this.streetname = e.long_name;
            break;
            case "country":
            this.country = e.long_name;
            break;
            case "locality":
            this.city = e.long_name;
            break;
          }}
        }
        else{alert('Unknown Address, Mowly says he is sorry but he will try again with another search query')}
      }


      addPlace(){
        this.loading = true;
        this.placeService.sAddPlace(this.name, this.streetname, this.housenumber, this.city, this.country, this.latitude, this.longitude)
        .subscribe(place => { this.place = place;
          if (place) {

            this.loading = false;
            this.router.navigate(['register/step-3']);


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
