<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Tymon\JWTAuth\Facades\JWTAuth;
use auth;
class UserToken extends Model
{
    public static function userPlaylod()
    {
        $token = JWTAuth::getToken();
        $playload = JWTAuth::getPayload($token)->toArray();

        return $playload;
    }
}
