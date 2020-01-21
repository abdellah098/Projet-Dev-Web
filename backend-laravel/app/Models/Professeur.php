<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    protected $fillable = [
        'grade', 'nbr_cours', 'user_id'
    ];
}
