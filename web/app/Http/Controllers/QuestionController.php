<?php

namespace App\Http\Controllers;


use App\Models\Question;
use Illuminate\Http\Request;
use App\Http\Controllers\AnswerController;

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

    
    public  function store($value,$qcm_id)
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

    public static function storeQuestions($questions,$qcm_id)
    {
        foreach ($questions as $question) {
            $question_id = (new self())->store($question['value'], $qcm_id);
            AnswerController::storeAnswers($question['answers'],$question_id);
        }
    }
}
