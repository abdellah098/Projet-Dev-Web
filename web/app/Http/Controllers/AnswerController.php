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
    
    public static function compareAnswers($user_answers, $good_answers)
    {
        if(count($user_answers) == count($good_answers)) {
            $length = count($good_answers);
            $i = 0;
            $egal = true;
            
            while($i < $length && $egal) {
                if($good_answers[$i] != $user_answers[$i])
                    $egal = false;
                
                    $i ++;
            }

            if($i = $length && $egal)
                return true;
            return false;
        } 

        return false;
    }
}
