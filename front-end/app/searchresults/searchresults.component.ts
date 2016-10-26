import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';

import { PlaceService } from '../services/place.service';
import { FoodService } from '../services/food.service';

import { Place } from '../models/place';
import { Food } from '../models/food';

import { URLSearchParams } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'searchresults',
  templateUrl: 'app/searchresults/searchresults.component.html',
  styleUrls:['app/searchresults/searchresults.component.css'],
})
export class SearchResultsComponent {
  placesResults: Place[];
  foodsResults: Food[];
  paramsSub: any;
  searchQuery: any;

  //Constructor for PlaceService
  constructor(
    private placeService: PlaceService,
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    // // //Get Params from URL
    // // this.activatedRoute.params.forEach((params: Params) =>  {
    // //   this.name= params['query'];  //get your param
    // //
    // // });
    //
    // this.name = this.activatedRoute.queryParams['query'];
    // console.log(this.activatedRoute.queryParams['query']);
    this.activatedRoute.queryParams.forEach((params: Params) => {
       let query = params['query'];
       this.searchQuery = params['query'];
       console.log(query);
       this.getPlaceByName(query);
       this.getFoodByName(query)
    });





  }

  getFoodByName(searchQuery: string) {
    // Parameters obj-
    let params: URLSearchParams = new URLSearchParams();
    params.set('foodquery', searchQuery);
    this.foodService.sGetFoodsByName(params)
    .subscribe(data => this.foodsResults = data);
  }

  getPlaceByName(searchQuery: string) {
    // Parameters obj-
    let params: URLSearchParams = new URLSearchParams();
    params.set('placequery', searchQuery);
    this.placeService.sGetPlacesByName(params)
    .subscribe(data => this.placesResults = data);
  }

}
