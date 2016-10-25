import { Component } from '@angular/core';

import { Place } from '../models/place';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'search-component',
  templateUrl: 'app/search/search.component.html',
  styleUrls:['app/search/search.component.css'],
})
export class SearchComponent {
  places: Place[];

  //Constructor for PlaceService
  constructor(private placeService: PlaceService) { }


  ngOnInit() {
    this.placeService.getPlaces()
    .subscribe(data => this.places = data);
  }

}
