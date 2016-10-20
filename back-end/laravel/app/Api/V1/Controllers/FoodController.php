<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use App\Place;
use App\Food;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
//FindorFail error catch
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FoodController extends Controller
{
  use Helpers;

  public function store(Request $request)
  {
    // Check if place_id sent with POST exists in database
    // If fails then ModelNotFoundException
    $place = Place::findOrFail($request->get('place_id'));

    //check if logged in user is owner of place before adding food.
    if ($place->user_id === $this->currentUser()->id) {
      //Creates new databaserecord in foodtable with info in URL
      $food = new Food;
      $food->name = $request->get('name');
      $food->description = $request->get('description');
      $food->price = $request->get('price');

      if($place->foods()->save($food))
      //Returns foodobject on completion
      return $food;
      else
      return $this->response->error('could_not_create_food', 500);
    } else {
      return $this->response->error('Only_place_owner_can_add_foods', 500);
    }

  }

  //easy function that returns currently logged in user
  private function currentUser()
  {
    return JWTAuth::parseToken()->authenticate();
  }
}
