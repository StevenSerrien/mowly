<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');

//routing where log in is needed
	$api->group(['middleware' => 'api.auth'], function ($api) {
		$api->post('place/store', 'App\Api\V1\Controllers\PlaceController@store');
		$api->post('food/store', 'App\Api\V1\Controllers\FoodController@store');
		$api->post('drink/store', 'App\Api\V1\Controllers\DrinkController@store');

	});

	//routing where log in is not needed.
	$api->get('places/{id}', 'App\Api\V1\Controllers\PlaceController@show');
	$api->get('places', 'App\Api\V1\Controllers\PlaceController@index');

//search routing
	//searches for foods and returns them with the place.
	$api->post('food/search', 'App\Api\V1\Controllers\FoodController@searchFoods');
	//searches for drinks and returns them with the place.
	$api->post('drink/search', 'App\Api\V1\Controllers\DrinkController@searchDrinks');
	//searches for places and returns them.
	$api->post('place/search', 'App\Api\V1\Controllers\PlaceController@searchPlaces');

});
