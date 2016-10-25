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
var FoodService = (function () {
    function FoodService(http) {
        this.http = http;
    }
    FoodService.prototype.getAllFoods = function () {
        // http get from api then tell TS compiler to treat this as Food[] array then parse the string to json
        //and the array we want is under the foods keyword
        return this.http.get(appSettings_1.AppSettings.API_ENDPOINT + "/foods").map(function (response) { return response.json().foods; });
    };
    FoodService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FoodService);
    return FoodService;
}());
exports.FoodService = FoodService;
//# sourceMappingURL=food.service.js.map