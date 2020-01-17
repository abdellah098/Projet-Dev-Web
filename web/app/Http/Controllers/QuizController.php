<?php

namespace App\Http\Controllers;

use App\Etudiant;
use App\Models\Qcm;
use App\Models\Answer;
use App\Models\Question;
use App\Models\UserToken;
use App\Models\Cours_Suivis;
use Illuminate\Http\Request;
use App\Http\Controllers\AnswerController;
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


    
    public function validerQuiz(Request $request)
    {
        
        $playload = UserToken::userPlaylod();
        $student = Etudiant::selectStudent($playload['id']);

        $cours_suivi = Cours_Suivis::where('etudiant_id',$student->id)
        ->where('cours_id', $request->get('cours_id'))
        ->first();

        //$questions = json_decode($request->get('questions'),True);
        $questions = $request->get('questions');
        
        $score = 0;
        foreach ($questions as $question) {

            $good_answers = Answer::questionGoodAnswers($question['question_id'])->pluck('id');
            $user_answers = $question['answers'];
              
            $score += (int)AnswerController::compareAnswers($user_answers, $good_answers);
        }

        $nb_question = count($questions);
        $min_score = (int)round(($nb_question * 70) / 100);

        $cours_suivi->note = $score;
        if($score >= $min_score)
            $cours_suivi->valide = true;
        
        $cours_suivi->save();

        if($score >= $min_score)
            return response()->json(['etat' => 'valide', 'score' => $score]);
        return response()->json(['etat' => ' non valide', 'score' => $score]);

    }


}
