import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { PlaceService } from '../services/place.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { Place } from '../models/place';
import { User } from '../models/user';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import {DrinkService} from "../services/drink.service";
import {FoodService} from "../services/food.service";
import {Drink} from "../models/drink";
import {Food} from "../models/food";



@Component({
    selector: 'place-component',
    templateUrl: 'app/place/place.component.html',
    styleUrls:['app/place/place.component.css'],
})

export class PlaceComponent {
    loading = false;
    token: string;
    place: Place;
    errorMessage: string;
    jwtHelper: JwtHelper = new JwtHelper();
    isOwnedByLoggedInUser: boolean;
    user: User;
    editMode: boolean;
    public foodForm: FormGroup; // our model driven form
    public drinkForm: FormGroup; // our model driven form
    public events: any[] = []; // use later to display form changes



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private placeservice: PlaceService,
    private drinkService: DrinkService,
    private _fb: FormBuilder,
    private foodService: FoodService) { }

    ngOnInit() {
        this.drinkForm = this._fb.group({
            drinks: this._fb.array([
                this.initDrink(),
            ])
        });
        this.foodForm = this._fb.group({

            foods: this._fb.array([
                this.initFood(),
            ])
        });
        this.loading = true;
        this.editMode = false;
        this.isOwnedByLoggedInUser = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.placeservice.sGetPlace(id).subscribe(place => {
                    this.place = place;
                    if(this.place.user_id = this.user.id)
                    {
                        this.isOwnedByLoggedInUser = true;
                    }
                    this.loading = false;
                },
                err => {

                    // Place fetch failed failed
                    this.errorMessage = err;
                    alert(this.errorMessage);
                    this.loading = false;

                });
        });

    }
    initFood() {
        // initialize our address
        return this._fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            price: ['', Validators.required]
        });
    }

    initDrink() {
        // initialize our address
        return this._fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(5)]],
            price: ['', Validators.required]
        });
    }

    addFoodInput() {
        // add address to the list
        const control = <FormArray>this.foodForm.controls['foods'];
        control.push(this.initFood());
    }

    removeFood(i: number) {
        // remove address from the list
        const control = <FormArray>this.foodForm.controls['foods'];
        control.removeAt(i);
    }

    addDrinkInput() {
        // add address to the list
        const control = <FormArray>this.drinkForm.controls['drinks'];
        control.push(this.initDrink());
    }

    removeDrink(i: number) {
        // remove address from the list
        const control = <FormArray>this.drinkForm.controls['drinks'];
        control.removeAt(i);
    }
    startEditMode(){
        this.editMode = true;
    }
    exitEditMode(){
        this.editMode = false;
    }

    // Save menu logic
    saveMenu() {
        this.loading = true;
        for (let food of this.foodForm.value.foods) {
            if(food.name != '' && food.price != '') {
                this.addFood(food.name, food.description, food.price, this.place.id);
            }
        }
        for (let drink of this.drinkForm.value.drinks) {
            if(drink.name != '' && drink.price != ''){
                this.addDrink(drink.name, drink.description, drink.price, this.place.id);
            }
        }
        this.loading = false;
        this.exitEditMode();

    }

    addFood(name: string, description: string, price: number, place_id: number){
        this.foodService.sAddFood(name, description, price, place_id)
            .subscribe(food => {
                    if (food) {
                        console.log(food.name + ' added!');
                        this.place.foods.push(food);
                    }
                },
                err => {

                    // food added failed
                    this.errorMessage = err;
                    alert(this.errorMessage);

                });
    }

    addDrink(name: string, description: string, price: number, place_id: number){
        this.drinkService.sAddDrink(name, description, price, place_id)
            .subscribe(drink => {
                    if (drink) {
                        console.log(drink.name + ' added!');
                        this.place.drinks.push(drink);

                    }
                },
                err => {

                    // drink added failed
                    this.errorMessage = err;
                    alert(this.errorMessage);

                });
    }
    removeDrink(drink: Drink){
        this.drinkService.removeDrink(drink.id).subscribe(response => {
                var index = this.place.drinks.indexOf(drink);
                if (index > -1) {
                    this.place.drinks.splice(index, 1);
                }

            },
            err => {

                // drink added failed
                this.errorMessage = err;
                alert(this.errorMessage);

            });
    }

    removeFood(food: Food){
        this.foodService.removeFood(food.id).subscribe(response => {
                var index = this.place.foods.indexOf(food);
                if (index > -1) {
                    this.place.foods.splice(index, 1);
                }

            },
            err => {

                // drink added failed
                this.errorMessage = err;
                alert(this.errorMessage);

            });
    }
}
