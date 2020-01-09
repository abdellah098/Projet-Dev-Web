<?php

namespace App\Http\Controllers;

use App\Models\Qcm;
use Illuminate\Http\Request;
use App\Http\Controllers\QuestionController;

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
            'cours_id' => $request->get('cours_id'),
        ]);
    
        //$questions = json_decode($request->get('questions',TRUE));

        $questions = $request->get('questions');
        QuestionController::storeQuestions($questions,1);    
        
        return response()->json(['success' => 'Quiz_is_created'],201);
    }

    
    public function show(Qcm $qcm)
    {
        //
    }


    
    public function update(Request $request, Qcm $qcm)
    {
        //
    }


}
