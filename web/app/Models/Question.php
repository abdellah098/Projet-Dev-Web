<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\QuestionCollection;


class Question extends Model
{
    protected $fillable = [
        'value', 'qcm_id',
    ];

    public static function quizQuestion($quiz_id)
    {
        $questions = (new self())::where('qcm_id', $quiz_id)->get();
        
        return  QuestionCollection::collection($questions);
    }
}
