<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use App\Place;
use App\User;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserController extends Controller
{
    use Helpers;

    //get all places
    public function getLoggedInUser()
    {
      $user = User::with('places')->find($this->currentUser()->id);

      return $user;
    }

      //easy function that returns currently logged in user
      private function currentUser()
      {
        return JWTAuth::parseToken()->authenticate();
      }

}
