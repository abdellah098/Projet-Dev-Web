<?php

namespace App\Http\Resources;

use App\Models\Answer;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionCollection extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'value' => $this->value,
            'qcm_id' => $this->qcm_id,
            'Answers' => Answer::questionAnswers($this->id),
        ];
    }
}
