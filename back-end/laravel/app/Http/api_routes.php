<?php
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Pragma");
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Credentials: true');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT');

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {



	//routing where log in is needed
	$api->group(['middleware' => 'cors'], function ($api) {
		$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
		$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
		$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
		$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');
	});

	//routing where log in is needed
	$api->group(['middleware' => ['api.auth', 'cors']], function ($api) {
		$api->post('place/store', 'App\Api\V1\Controllers\PlaceController@store');
		$api->post('food/store', 'App\Api\V1\Controllers\FoodController@store');
		$api->post('drink/store', 'App\Api\V1\Controllers\DrinkController@store');
	});

	//routing where log in is not needed.
	$api->group(['middleware' => 'cors'], function ($api) {
		$api->get('places/{id}', 'App\Api\V1\Controllers\PlaceController@show');
		$api->get('places', 'App\Api\V1\Controllers\PlaceController@index');
		$api->get('foods', 'App\Api\V1\Controllers\FoodController@index');


		//search routing
		//searches for foods and returns them with the place.
		$api->get('food/search', 'App\Api\V1\Controllers\FoodController@searchFoods');
		//searches for drinks and returns them with the place.
		$api->get('drink/search', 'App\Api\V1\Controllers\DrinkController@searchDrinks');
		//searches for places and returns them.
		$api->get('place/search', 'App\Api\V1\Controllers\PlaceController@searchPlaces');
		//searches for places WITH query nearby user and returns them.
		$api->get('place/searchwithlocation', 'App\Api\V1\Controllers\PlaceController@searchPlacesWithLocation');
		//searches for places WITHOUT query nearby user and returns them.
		$api->get('place/searchnearbylocation', 'App\Api\V1\Controllers\PlaceController@searchNearbyLocation');
		
	});


});
