<?php

$api = app('Dingo\Api\Routing\Router');

$api->version('v1', function ($api) {

	$api->post('auth/login', 'App\Api\V1\Controllers\AuthController@login');
	$api->post('auth/signup', 'App\Api\V1\Controllers\AuthController@signup');
	$api->post('auth/recovery', 'App\Api\V1\Controllers\AuthController@recovery');
	$api->post('auth/reset', 'App\Api\V1\Controllers\AuthController@reset');


	$api->group(['middleware' => 'api.auth'], function ($api) {
		$api->post('place/store', 'App\Api\V1\Controllers\PlaceController@store');
	});
	$api->get('places/{id}', 'App\Api\V1\Controllers\PlaceController@show');
	$api->get('places', 'App\Api\V1\Controllers\PlaceController@index');


	// example of protected route
	$api->get('protected', ['middleware' => ['api.auth'], function () {
		return \App\User::all();
	}]);

	// example of free route
	$api->get('free', function() {
		return \App\User::all();
	});

});
