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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var place_service_1 = require("../services/place.service");
var SearchComponent = (function () {
    //Constructor for PlaceService
    function SearchComponent(placeService) {
        this.placeService = placeService;
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.placeService.sGetAllPlaces()
            .subscribe(function (data) { return _this.places = data; });
        this.getPlaceByName('ot');
    };
    SearchComponent.prototype.getPlaceByName = function (searchQuery) {
        var _this = this;
        // Parameters obj-
        var params = new http_1.URLSearchParams();
        params.set('placequery', searchQuery);
        this.placeService.sGetPlacesByName(params)
            .subscribe(function (data) { return _this.placesResults = data; });
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    core_1.Component({
        selector: 'search-component',
        templateUrl: 'app/search/search.component.html',
        styleUrls: ['app/search/search.component.css'],
    }),
    __metadata("design:paramtypes", [place_service_1.PlaceService])
], SearchComponent);
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map