<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cours_Suivis extends Model
{
    protected $fillable = [
        'note', 'user_id', 'cours_id'
    ];
}
