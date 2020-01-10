<?php

namespace App\Http\Controllers;

use App\Etudiant;
use App\Models\Cours_Suivis;
use Illuminate\Http\Request;

class EtudiantController extends Controller
{
    public static function store($user_id)
    {
        Etudiant::create(['user_id' => $user_id]);
    }
    public function subscribe(Request $request)
    {
        $cours_suivis = Cours_Suivis::create([
            'etudiant_id' => $request->get('etudiant_id'),
            'cours_id' => $request->get('cours_id'),
        ]);
        
        if($cours_suivis )
           return response()->json(['success'],201); 
        else
           return response()->json(['error'],201);
    }
    public function unsubscribe(Request $request)
    {
        //
    }
}
