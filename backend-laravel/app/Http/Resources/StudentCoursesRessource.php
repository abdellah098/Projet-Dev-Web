<?php

namespace App\Http\Resources;

use App\Models\Cours_Suivis;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentCoursesRessource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request,$student_id)
    {
        return [
        'id' => $this->id,
        'titre' => $this->titre,
        'description' => $this->description,
        'niveau' => $this->niveau,
        'duree' => $this->duree,
        'document' => $this-document,
        'categorie' => $this->categorie,
        'difficulte' => $this->difficulte,
        'objectif' => $this->objectif,
        'prerequis' => $this->prerequis,
        'image_cours' => $this->image_cours,
        'professeur_id' => $this->professeur_id,
        'cours_suivi' => Cours_Suivis::selectCoursSuivi($this->id,$student_id)
        ];
    }
}
