<?php

namespace App\Http\Controllers;


use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
  
    public function index()
    {
        //
    }

   
    public function create()
    {
        //
    }

    
    public function store($value,$qcm_id)
    {
        $question = Question::create([
            'value' => $value,
            'qcm_id' => $qcm_id
        ]);
        return $question->id;
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
