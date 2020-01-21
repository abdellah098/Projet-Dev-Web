<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\User;
use App\Models\UserToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTFactory;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\ProfesseurController;

class UserController extends Controller
{
    public function authenticate(Request $request)
    {
       
        $user =  DB::table('users')->where('email', $request->get('email'))->first();
        if($user == null) {
                return response()->json(['error' => 'could_not_found_user'], 404); 
        }

        $credentials = $request->only('email', 'password');
        try {
            if (! $token = auth()->claims(['id' => $user->id, 'statut' => $user->statut])->attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
            $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'prenom' => 'required',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'min:6|same:password',
            'date_naissance' => 'required',
            'statut' => 'required',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'prenom' =>$request->get('prenom'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'date_naissance' =>$request->get('date_naissance'),
            'statut' =>$request->get('statut'),
            'biographie' =>$request->get('biographie'),
            'mini_bio' =>$request->get('mini_bio'),
            'photo_profil' =>$request->get('photo_profil'),

        ]);

        //create teacher or student object depending on the status
        if($user->statut =='teacher')
                ProfesseurController::store($user->id);
        else
                EtudiantController::store($user->id);

        $token = JWTAuth::fromUser($user)  ;

        return response()->json(compact('user','token'),201);
    }

    public function getAuthenticatedUser()
        {
                try {

                        if (! $user = JWTAuth::parseToken()->authenticate()) {
                                return response()->json(['user_not_found'], 404);
                        }

                } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                        return response()->json(['token_expired'], $e->getStatusCode());

                } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                        return response()->json(['token_invalid'], $e->getStatusCode());

                } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

                        return response()->json(['token_absent'], $e->getStatusCode());

                }

                return response()->json(compact('user'));
        }
         public function information(Request $request)
        {
                $playload = UserToken::userPlaylod();

                $user = User::find($playload['id']);

                return response()->json(['nom' => $user->name, 'prenom' => $user->prenom, 'email' => $user->email]);
                
        }
}