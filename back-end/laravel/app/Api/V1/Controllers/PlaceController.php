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
      ->get()
      ->toArray();

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

    //$place->load('drinks', 'foods');


    if(!$place){
      throw new NotFoundHttpException;
    }
    return $place;
  }

  //easy function that returns currently logged in user
  private function currentUser()
  {
    return JWTAuth::parseToken()->authenticate();
  }


}
