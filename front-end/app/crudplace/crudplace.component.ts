import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';
import { GeolocationService } from '../services/geolocation.service';

import { Router, NavigationExtras }  from '@angular/router';


@Component({
  selector: 'mapstest-component',
  templateUrl: 'app/crudplace/crudplace.component.html',
  styleUrls:['app/crudplace/crudplace.component.css'],
})
export class CrudPlaceComponent {
  mapsresponse: any;
  streetname: string;
  housenumber: string;
  city: string;
  latitude: string;
  longitude: string;
  country: string;




  //Constructor for PlaceService
  constructor(private placeService: PlaceService, private router: Router, private geolocationService: GeolocationService) { }



  ngOnInit() {

    this.geolocationService.getCurrentPosition();

  }
  mapstest(address){
    this.placeService.sGetGeoAndAdress(address)
    .subscribe(data => this.mapData(data));
  }

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
      else{alert('Unknown Adress')}
    }
  }
