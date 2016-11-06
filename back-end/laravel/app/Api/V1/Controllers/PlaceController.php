<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Pagination\Paginator;
use JWTAuth;
use App\Place;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Facades\Input;

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
            return $place;
        else
            return $this->response->error('could_not_create_place', 500);
    }

    public function delete($id)
    {
        $place = Place::find($id);
        $user = $this->currentUser();
        if ($place->user_id == $user->id)
        {
            $place->delete();
            return 'Place deleted';

        }
        else{
            return Response::make(['errors' => [['Only owner can delete.']]], 401);
        }
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
        if ($request->input("placequery") == '') {
            //searchstring can not be empty
            return 'Empty searchstring :-(';
        } else {
            $query =  '%'.$request->input("placequery").'%';
            $places = Place::where('name', 'LIKE', $query)->get();
            return $places;
        }
    }
    // search for places with query, nearby user.
    public function searchPlacesWithLocation(Request $request)
    {
        if ($request->input("placequery") == '') {
            //searchstring can not be empty
            return 'Empty searchstring :-(';
        }
        /*   else {
             $query =  '%'.$request->input("placequery").'%';
             $from_latitude = $request->input("user_latitude");
             $from_longitude = $request->input("user_longitude");
             //distance is in m
             $distance = $request->input("distance");
             $places = Place::where('name', 'LIKE', $query)->distance($from_latitude,$from_longitude,$distance)->get();
               $result_p = new Paginator($places, 5, $request->input('page'),['path' => $request->fullUrlWithQuery($request->all()) ]);
               return $result_p;
           }*/
        else{
            $query =  '%'.$request->input("placequery").'%';
            $from_latitude = $request->input("user_latitude");
            $from_longitude = $request->input("user_longitude");
            return $places = Place
                ::selectRaw(" *,".'ROUND ( ( 6371000 * acos( cos( radians('.$from_latitude.') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('.$from_longitude.') ) + sin( radians('.$from_latitude.') ) * sin( radians( latitude ) ) ) ) ) AS'." distance ")
                ->where('name', 'LIKE', $query)
                ->orderBy('distance')
                ->paginate(5)
                ->appends(Input::except('page'));
        }
    }

    // Get all places nearby user.
    public function searchNearbyLocation(Request $request)
    {
        $from_latitude = $request->input("user_latitude");
        $from_longitude = $request->input("user_longitude");
        //distance is in m
        $distance = $request->input("distance");
        $places = Place::distance($from_latitude,$from_longitude,$distance)->get();
        return $places;
    }

    //easy function that returns currently logged in user
    private function currentUser()
    {
        return JWTAuth::parseToken()->authenticate();
    }


}
