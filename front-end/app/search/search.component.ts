import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';
import { Router, NavigationExtras }  from '@angular/router';


@Component({
  selector: 'search-component',
  templateUrl: 'app/search/search.component.html',
  styleUrls:['app/search/search.component.css'],
})
export class SearchComponent {
  places: Place[];

  //Constructor for PlaceService
  constructor(private placeService: PlaceService, private router: Router) { }



  ngOnInit() {
    this.placeService.sGetAllPlaces()
    .subscribe(data => this.places = data);


  }

  searchQuery(params: string) {
    // Set our navigation extras object
    // that contains our global query params and fragment
    let navigationExtras: NavigationExtras = {
      queryParams: { 'query': params }
    };

    // Navigate to the login page with extras
    this.router.navigate(['/results'], navigationExtras);
    return false;
  }


}
