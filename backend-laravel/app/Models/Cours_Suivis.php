<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cours_Suivis extends Model
{
    protected $fillable = [
        'note', 'etudiant_id', 'cours_id'
    ];

    public static function selectCoursSuivi($cours_id,$student_id)
    {
        return (new self())::where('cours_id',cours_id)
        ->where('etudiant_id',$student_id)
        ->first();
    }
}
