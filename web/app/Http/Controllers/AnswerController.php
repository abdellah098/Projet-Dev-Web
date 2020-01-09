<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function store($value, $is_correct, $question_id)
    {
        $quiz = Answer::create([
            'value' => $value,
            'is_correct' => $is_correct,
            'question_id' => $question_id,
        ]);
        
        return $quiz->id;
    }
    public static function storeAnswers($answers, $question_id)
    {
        foreach ($answers as $answer) {
            (new self())->store($answer['value'], $answer['is_correct'], $question_id);
        }
    }
}
