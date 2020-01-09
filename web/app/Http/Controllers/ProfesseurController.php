<?php

namespace App\Http\Controllers;

use App\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfesseurController extends Controller
{
    public static function store($user_id)
    {
        Professeur::create(['user_id' => $user_id]);
    }

    public static function selectTeacher($user_id)
    {
        return   Professeur::where('user_id', $user_id)->first();
    }
}
