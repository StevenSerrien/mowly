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

  // search for foods and return every place that has it.
  public function searchFoods(Request $request)
  {
    if ($request->input("foodquery") == '') {
      //searchstring can not be empty
      return 'Empty searchstring :-(';
    } else {
      $query =  '%'.$request->input("foodquery").'%';
      $foods = Food::with('place')->where('name', 'LIKE', $query)->get();
      return $foods;
    }
  }

  // search for foods and return every place that has it.
  public function searchFoodsWithLocation(Request $request)
  {
    if ($request->input("foodquery") == '') {
      //searchstring can not be empty
      return 'Empty searchstring :-(';
    } else {
      $query =  '%'.$request->input("foodquery").'%';
      $from_latitude = $request->input("user_latitude");
      $from_longitude = $request->input("user_longitude");
      //distance is in m
      $distance = (int) $request->input("distance");

      $foods = Food::with('place')->where('name', 'LIKE', $query)->get();
      foreach ($foods as $food) {
        $food['distanceInMeters'] = (int) $this->distance($from_latitude,$from_longitude,$food->place->latitude,$food->place->longitude, 'K');
        $food['distance'] = $distance;
      }
      // $foods->where('distanceInMeters', '<', $distance;
      // $filtered = $foods->whereIn('distanceInMeters', [1, 6]);

      $filtered = $foods->filter(function ($food) {
        return $food['distanceInMeters'] <= $food['distance'];
      });

      $filtered->all();
      return $filtered;

    }
  }

  public function index()
  {
    $foods = Food::orderBy('created_at', 'DESC')
    ->get();

    return $foods;
  }

  //easy function that returns currently logged in user
  private function currentUser()
  {
    return JWTAuth::parseToken()->authenticate();
  }

  function distance($lat1, $lon1, $lat2, $lon2, $unit) {

    $theta = $lon1 - $lon2;
    $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
    $dist = acos($dist);
    $dist = rad2deg($dist);
    $miles = $dist * 60 * 1.1515 * 1000;
    $unit = strtoupper($unit);

    if ($unit == "K") {
      return ($miles * 1.609344);
    } else if ($unit == "N") {
      return ($miles * 0.8684);
    } else {
      return $miles;
    }
  }
}
