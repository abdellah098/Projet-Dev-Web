<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    protected $fillable = [
        'niveau', 'nbr_cours_suivis', 'nbr_cours_complete', 'user_id'
    ];
}
