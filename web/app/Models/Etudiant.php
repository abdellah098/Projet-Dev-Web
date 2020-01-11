<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    protected $fillable = [
        'niveau', 'nbr_cours_suivis', 'nbr_cours_complete', 'user_id'
    ];
    public static function isStudent($statut)
    {
        return $statut == 'student';
    }
    public static function selectStudent($user_id)
    {
        return (new self())::where('user_id',$user_id)->first();
    }
}
