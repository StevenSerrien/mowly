<?php

namespace App\Api\V1\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use Validator;
use App\Place;
use App\User;
use Dingo\Api\Routing\Helpers;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Dingo\Api\Exception\ValidationHttpException;


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

    public function editUserData(Request $request)
    {
        $credentials = $request->only(
            'email', 'name'
        );
        $validator = Validator::make($credentials, [
            'name' => 'required',
            'email' => 'required|email'
        ]);
        if($validator->fails()) {
            throw new ValidationHttpException($validator->errors()->all());
        }
        $user = JWTAuth::parseToken()->authenticate();
        if ($request->get('name') != ''){
            $user->name = $request->get('name');
        }
        if ($request->get('email') != ''){
            $user->email = $request->get('email');
        }
        if($user->save()){
            return $this->response->created();
        }
        else{
            return $this->response->error('could_not_change_user_details', 500);
        }
    }

    public function editUserPassword(Request $request)
    {
        $credentials = $request->only(
            'old_password', 'new_password'
        );
        $validator = Validator::make($credentials, [
            'old_password' => 'required|min:6',
            'new_password' => 'required|min:6'
        ]);
        if($validator->fails()) {
            throw new ValidationHttpException($validator->errors()->all());
        }
        $user = JWTAuth::parseToken()->authenticate();
        if (\Hash::check($request->get('old_password'), $user->password)){
            $user->password = $request->get('new_password');
            if($user->save()){
                return $this->response->created();
            }
        }
        else{
            return $this->response->error('could_not_change_user_password_password_incorrect', 500);
        }
    }
}
