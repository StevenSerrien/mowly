<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use App\Place;
use App\Drink;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DrinkController extends Controller
{
  use Helpers;

  public function store(Request $request)
  {

    // Check if place_id sent with POST exists in database
    // If fails then ModelNotFoundException
    $place = Place::findOrFail($request->get('place_id'));

    //check if logged in user is owner of place before adding food.
    if ($place->user_id === $this->currentUser()->id) {
      //Creates new databaserecord in foodtable with info from request
      $drink = new Drink;
      $drink->name = $request->get('name');
      $drink->description = $request->get('description');
      $drink->price = $request->get('price');

      if($place->drinks()->save($drink))
      //Returns foodobject on completion
      return $drink;
      else
      return $this->response->error('could_not_create_drink', 500);
    }
    else {
      return $this->response->error('Only_place_owner_can_add_foods', 500);
    }
  }

  //easy function that returns currently logged in user
  private function currentUser()
  {
    return JWTAuth::parseToken()->authenticate();
  }
}
