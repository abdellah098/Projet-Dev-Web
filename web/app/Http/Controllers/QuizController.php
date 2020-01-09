<?php

namespace App\Http\Controllers;

use App\Models\Qcm;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    
    public function index()
    {
        //
    }

   
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        $quiz = Qcm::create([
            'titre' => $request->get('titre'),
            'cours_id' => $request->get('cours_id'),
        ]);
        
    
    }

    
    public function show(Qcm $qcm)
    {
        //
    }

   
    public function edit(Qcm $qcm)
    {
        //
    }

    
    public function update(Request $request, Qcm $qcm)
    {
        //
    }

    
    public function destroy(Qcm $qcm)
    {
        //
    }
}
