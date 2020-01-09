<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
  protected $fillable = [
    'value', 'is_correct', 'question_id',
    
  ];
}
