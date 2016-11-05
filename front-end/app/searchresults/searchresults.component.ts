import { Component } from '@angular/core';
import { SearchComponent } from '../search/search.component';

import { PlaceService } from '../services/place.service';
import { FoodService } from '../services/food.service';
import { DrinkService } from '../services/drink.service';

import { Place } from '../models/place';
import { Food } from '../models/food';
import { Drink } from '../models/drink';

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
    drinksResults: Drink[];
    paramsSub: any;
    searchQuery: any;
    latitude: string;
    longitude: string;

    //Constructor for PlaceService
    constructor(
        private placeService: PlaceService,
        private foodService: FoodService,
        private drinkService: DrinkService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {

        this.latitude = sessionStorage.getItem('latitude');
        this.longitude = sessionStorage.getItem('longitude');
        this.activatedRoute.queryParams.forEach((params: Params) => {
            let query = params['query'];
            this.searchQuery = params['query'];
            console.log(query);
            if(this.latitude && this.longitude) {
                this.getPlaceByNameWithLocation(query);
            this.getFoodByNameWithLocation(query);
            this.getDrinkByNameWithLocation(query);
            }
            else{

            }

        });
    }

    getDrinkByName(searchQuery: string) {
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        params.set('drinkquery', searchQuery);
        this.drinkService.sGetDrinksByName(params)
            .subscribe(data => this.drinksResults = data);
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

    getDrinkByNameWithLocation(searchQuery: string) {
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        params.set('drinkquery', searchQuery);
        params.set('user_latitude', this.latitude);
        params.set('user_longitude', this.longitude);
        this.drinkService.sGetDrinksByNameWithLocation(params)
            .subscribe(data => this.drinksResults = data);
    }


    getFoodByNameWithLocation(searchQuery: string) {
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        params.set('foodquery', searchQuery);
        params.set('user_latitude', this.latitude);
        params.set('user_longitude', this.longitude);
        this.foodService.sGetFoodsByNameWithLocation(params)
            .subscribe(data => this.foodsResults = data);
    }

    getPlaceByNameWithLocation(searchQuery: string) {
        // Parameters obj-
        let params: URLSearchParams = new URLSearchParams();
        params.set('placequery', searchQuery);
        params.set('user_latitude', this.latitude);
        params.set('user_longitude', this.longitude);
        this.placeService.sGetPlacesByNameWithLocation(params)
            .subscribe(data => this.placesResults = data);
    }
    onSelect(place: Place) {
        this.router.navigate(['/place', place.id]);
    }

}
