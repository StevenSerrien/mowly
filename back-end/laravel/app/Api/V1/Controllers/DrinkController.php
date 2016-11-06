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
use Illuminate\Support\Facades\Input;


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
            //Creates new databaserecord in drinktable with info from request
            $drink = new Drink;
            $drink->name = $request->get('name');
            $drink->description = $request->get('description');
            $drink->price = $request->get('price');

            if($place->drinks()->save($drink))
                //Returns drinkobject on completion
                return $drink;
            else
                return $this->response->error('could_not_create_drink', 500);
        }
        else {
            return $this->response->error('Only_place_owner_can_add_foods', 500);
        }
    }

    public function delete($id)
    {
        $drink = Drink::with('place')->find($id);
        $user = $this->currentUser();
        if ($drink->place->user_id == $user->id)
        {
            $drink->delete();
            return 'Drink deleted';
        }
        else{
            return Response::make(['errors' => [['Only owner can delete.']]], 401);
        }
    }

// search for drinks and return every place that has it.
    public function searchDrinks(Request $request)
    {
        //searchstring can not be empty
        if ($request->input("drinkquery") == '') {
            return 'Empty searchstring :-(';
        } else {
            $query =  '%'.$request->input("drinkquery").'%';
            $drinks = Drink::with('place')->where('name', 'LIKE', $query)->get();
            return $drinks;
        }
    }

    // search for drinks and return every place that has it.
    public function searchDrinksWithLocation(Request $request)
    {
        if ($request->input("drinkquery") == '') {
            //searchstring can not be empty
            return 'Empty searchstring :-(';
        }
        else{
            $query =  '%'.$request->input("drinkquery").'%';
            $from_latitude = $request->input("user_latitude");
            $from_longitude = $request->input("user_longitude");
            return $drinks = Drink
                ::join('places', 'drinks.place_id', '=', 'places.id')
                ->where('drinks.name', 'LIKE', $query)
                ->select('places.name as placeName', 'drinks.*', \DB::raw('ROUND ( ( 6371000 * acos( cos( radians('.$from_latitude.') ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians('.$from_longitude.') ) + sin( radians('.$from_latitude.') ) * sin( radians( latitude ) ) ) ) ) AS'." distance"))
                ->orderBy('distance')
                ->paginate(10)
                ->appends(Input::except('page'));
        }
    }

    //easy function that returns currently logged in user
    private function currentUser()
    {
        return JWTAuth::parseToken()->authenticate();
    }
}
