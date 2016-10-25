import { Component } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'search-component',
  templateUrl: 'app/search/search.component.html',
  styleUrls:['app/search/search.component.css'],
})
export class SearchComponent {
  places: Place[];
  placesResults: Place[];

  //Constructor for PlaceService
  constructor(private placeService: PlaceService) { }


  ngOnInit() {
    this.placeService.sGetAllPlaces()
    .subscribe(data => this.places = data);
    this.getPlaceByName('ot');
  }

  getPlaceByName(searchQuery: string) {
    // Parameters obj-
    let params: URLSearchParams = new URLSearchParams();
    params.set('placequery', searchQuery);
    this.placeService.sGetPlacesByName(params)
    .subscribe(data => this.placesResults = data);
  }
}
