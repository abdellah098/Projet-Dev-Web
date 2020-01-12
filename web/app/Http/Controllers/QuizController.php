<?php

namespace App\Http\Controllers;

use App\Models\Qcm;
use App\Models\Question;
use App\Models\UserToken;
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
        $playload = UserToken::userPlaylod();
        
        if($playload['statut'] == 'teacher') {
            $quiz = Qcm::create([
                'cours_id' => $request->get('cours_id'),
            ]);
        
            $questions = json_decode($request->get('questions'),True);
            //$questions = $request->get('questions');

            QuestionController::storeQuestions($questions,$quiz->cours_id);    
            
            return response()->json(['success' => 'Quiz_is_created'],201);
        } else {
            return response()->json(['error' => 'user_is_not_teacher'], 404);
        }
        
    }

    
    public function courseQuiz(Request $request)
    {
        $quiz = Qcm::where('cours_id', $request->get('cours_id'))->first();
        return Question::quizQuestion($quiz->id);
    }


    
    public function update(Request $request, Qcm $qcm)
    {
        //
    }


}
