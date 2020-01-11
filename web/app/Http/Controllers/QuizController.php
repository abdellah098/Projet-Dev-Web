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
        $token = JWTAuth::getToken();
        $playload = JWTAuth::getPayload($token)->toArray();
        
        if($playload['statut'] == 'teacher') {
            $quiz = Qcm::create([
                'cours_id' => $request->get('cours_id'),
            ]);
        
            $questions = json_decode($request->get('questions'),True);
    
            QuestionController::storeQuestions($questions,$quiz->cours_id);    
            
            return response()->json(['success' => 'Quiz_is_created'],201);
        } else {
            return response()->json(['error' => 'user_is_not_teacher'], 404);
        }
        
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
