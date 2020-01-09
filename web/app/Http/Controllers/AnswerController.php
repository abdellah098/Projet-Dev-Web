<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function store($value,$question_id,$is_correct)
    {
        $quiz = Answer::create([
            'value' => $value,
            'question_id' => $question_id,
            'is_correct' => $is_correct,
        ]);
        
        return $quiz->id;
    }
}
