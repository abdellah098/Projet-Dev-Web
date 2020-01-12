<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
  protected $fillable = [
    'value', 'is_correct', 'question_id',
    
  ];

  public static function questionAnswers($question_id)
  {
     return (new self())::where('question_id', $question_id)->get();
  }
}
