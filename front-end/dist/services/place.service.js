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
var http_1 = require('@angular/http');
var appSettings_1 = require('../appSettings');
require('rxjs/add/operator/map');
var PlaceService = (function () {
    function PlaceService(http) {
        this.http = http;
    }
    PlaceService.prototype.getAllPlaces = function () {
        return this.http.get(appSettings_1.AppSettings.API_ENDPOINT + "/places")
            .map(function (response) { return response.json().places; });
    };
    PlaceService.prototype.getAllPlacesByName = function () {
        //return this.http.post(`${AppSettings.API_ENDPOINT}/places/search`)
    };
    PlaceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PlaceService);
    return PlaceService;
}());
exports.PlaceService = PlaceService;
//# sourceMappingURL=place.service.js.map