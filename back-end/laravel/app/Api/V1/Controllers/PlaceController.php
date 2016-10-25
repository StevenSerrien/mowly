<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use App\Place;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class PlaceController extends Controller
{
  use Helpers;

  //get all places
  public function index()
  {
    $places = Place::orderBy('created_at', 'DESC')
    ->get();

    return $places;
  }

  public function store(Request $request)
  {
    $place = new Place;
    $place->name = $request->get('name');
    $place->streetname = $request->get('streetname');
    $place->housenumber = $request->get('housenumber');
    $place->city = $request->get('city');
    $place->country = $request->get('country');
    $place->latitude = $request->get('latitude');
    $place->longitude = $request->get('longitude');

    if($this->currentUser()->places()->save($place))
    return $this->response->created();
    else
    return $this->response->error('could_not_create_place', 500);
  }


  public function show($id)
  {
    $place = Place::with('drinks', 'foods')->find($id);


    if(!$place){
      throw new NotFoundHttpException;
    }
    return $place;
  }

  // search for places with query.
  public function searchPlaces(Request $request)
  {
    if ($request->get("placequery") == '') {
      //searchstring can not be empty
      return 'Empty searchstring :-(';
    } else {
      $query =  '%'.$request->get("placequery").'%';
      $places = Place::where('name', 'LIKE', $query)->get();
      return $places;
    }
  }
  // search for places with query, nearby user.
  public function searchPlacesWithLocation(Request $request)
  {
    if ($request->get("placequery") == '') {
      //searchstring can not be empty
      return 'Empty searchstring :-(';
    } else {
      $query =  '%'.$request->get("placequery").'%';
      $from_latitude = $request->get("user_latitude");
      $from_longitude = $request->get("user_longitude");
      //distance is in m
      $distance = $request->get("distance");
      $places = Place::where('name', 'LIKE', $query)->distance($from_latitude,$from_longitude,$distance)->get();
      return $places;
    }
  }

  // Get all places nearby user.
  public function searchNearbyLocation(Request $request)
  {
      $from_latitude = $request->get("user_latitude");
      $from_longitude = $request->get("user_longitude");
      //distance is in m
      $distance = $request->get("distance");
      $places = Place::distance($from_latitude,$from_longitude,$distance)->get();
      return $places;
  }

  //easy function that returns currently logged in user
  private function currentUser()
  {
    return JWTAuth::parseToken()->authenticate();
  }


}
