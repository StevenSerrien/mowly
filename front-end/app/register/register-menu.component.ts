import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { JwtHelper } from 'angular2-jwt';
import { tokenNotExpired } from 'angular2-jwt';
import { FoodService }  from "../services/food.service";
import { Food } from '../models/food';
import { UserService } from '../services/user.service';
import { Place } from '../models/place';



//REACTIVE FORMS
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  //moduleId: module.id,
  selector: 'register-menu-component',
  templateUrl: 'app/register/register-menu.component.html',
  styleUrls:['app/register/register.component.css'],
})

export class RegisterMenuComponent {

  greetmessage = "Awesome! Now it's time to add your menucard";
  stepnumber = "Step 3";

  public foodForm: FormGroup; // our model driven form
  public drinkForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes

  model: any = {};
  loading = false;
  token: string;
  errorMessage: string;
  place_id: number;
  place: Place;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
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


      this.userService.sGetLoggedInUserData()
      .subscribe(user => {
            //put fetched user data in local storage.
            localStorage.setItem('user', JSON.stringify(user));
            this.userService.userData();
            //check if there are no places for this person
            console.log('my girth is: ' + Object.keys(this.userService.user.places).length);
            if (Object.keys(this.userService.user.places).length === 0) {
              this.router.navigate(['register/step-2']);
            }
            if (Object.keys(this.userService.user.places).length === 1) {
              this.place_id = this.userService.user.places[0].id;
              this.place = this.userService.user.places[0];
            }
            else {
              this.router.navigate(['/']);
            }
      },
      err => {
        // user fetch failed
        this.errorMessage = err;
        alert(this.errorMessage);
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


    // Save menu logic
    saveMenu() {
      this.loading = true;
      for (let food of this.foodForm.value.foods) {
        // console.log(food); // 1, "string", false
        this.addFood(food.name, food.description, food.price, 3);
      };
      for (let drink of this.drinkForm.value.drinks) {
        console.log(drink); // 1, "string", false
      };
      this.loading = false;
    }

    addFood(name: string, description: string, price: number, place_id: number){
      this.foodService.sAddFood(name, description, price, place_id)
      .subscribe(food => {
        if (food) {
          console.log(food.name + ' added!')
        }
      },
      err => {

        // food added failed
        this.errorMessage = err;
        alert(this.errorMessage);

      });
    }



  }
