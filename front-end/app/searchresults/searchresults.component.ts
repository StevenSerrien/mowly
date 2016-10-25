import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { PlaceService } from '../services/place.service';
import { Place } from '../models/place';
import { URLSearchParams } from '@angular/http';


@Component({
  selector: 'searchresults',
  templateUrl: 'app/searchresults/searchresults.component.html',
  styleUrls:['app/searchresults/searchresults.component.css'],
})
export class SearchResultsComponent {
  placesResults: Place[];

  //Constructor for PlaceService
  constructor(private placeService: PlaceService) { }

  ngOnInit() {
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
