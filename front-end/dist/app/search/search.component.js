"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var place_service_1 = require('../services/place.service');
var router_1 = require('@angular/router');
var SearchComponent = (function () {
    //Constructor for PlaceService
    function SearchComponent(placeService, router) {
        this.placeService = placeService;
        this.router = router;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.placeService.sGetAllPlaces()
            .subscribe(function (data) { return _this.places = data; });
    };
    SearchComponent.prototype.searchQuery = function (params) {
        // Set our navigation extras object
        // that contains our global query params and fragment
        var navigationExtras = {
            queryParams: { 'query': params }
        };
        // Navigate to the login page with extras
        this.router.navigate(['/results'], navigationExtras);
        return false;
    };
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search-component',
            templateUrl: 'app/search/search.component.html',
            styleUrls: ['app/search/search.component.css'],
        }), 
        __metadata('design:paramtypes', [place_service_1.PlaceService, router_1.Router])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map