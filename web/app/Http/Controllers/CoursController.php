<?php

namespace App\Http\Controllers;
use Tymon\JWTAuth\Facades\JWTAuth;
use auth;
use App\User;
use App\Models\Cours;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CoursController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $token = JWTAuth::getToken();
        $playload = JWTAuth::getPayload($token)->toArray();
        
        if($playload['statut'] == 'teacher') {
            $validator = $this->validateCours($request);
            if($validator->fails()){
                    return response()->json($validator->errors()->toJson(), 400);
            }
    
            try {
                $user = auth()->userOrFail();
            } catch (\Tymon\JWTAuth\Exceptions\UserNotDefinedException $e) {
                return response()->json(['error' => $e->getMessage()]);
            }
    
            $cours = $this->createCours($request);
            $cours['professeur_id'] = $playload['id'];
            $cours = Cours::create($cours);
            
            return response()->json(['success' => 'the_course_is_created'], 201);
        } else {
            return response()->json(['error' => 'user_is_not_teacher'], 404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cours  $cours
     * @return \Illuminate\Http\Response
     */
    public function show(Cours $cours)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Cours  $cours
     * @return \Illuminate\Http\Response
     */
    public function edit(Cours $cours)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Cours  $cours
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cours $cours)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cours  $cours
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cours $cours)
    {
        //
    }
    protected function validateCours(Request $request)
    {
        return Validator::make($request->all(), [
            'titre' => 'required',
            'description' => 'required',
            'document' => 'required',           
            ]);
    }
    protected function createCours(Request $request)
    {
        return [
            'titre' => $request->get('titre'),
            'description' =>$request->get('description'),
            'niveau' => $request->get('niveau'),
            'duree' => $request->get('duree'),
            'document' =>$request->get('document'),
            'categorie' =>$request->get('statut'),
            'difficulte' =>$request->get('difficulte'),
            'objectif' =>$request->get('objectif'),
            'prerequis' =>$request->get('prerequis'),
            'professeur_id' => '',
        ];
    }
}
