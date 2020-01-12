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
        $nombre_question = $questions->count();
        return  ['Questions' => QuestionCollection::collection($questions), 'nombre' => $nombre_question];
    }
}
