<?php

namespace App\Http\Controllers;

use App\Etudiant;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public static function store($user_id)
    {
        Etudiant::create(['user_id' => $user_id]);
    }
}
