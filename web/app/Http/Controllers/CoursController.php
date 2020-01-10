<?php

namespace App\Http\Controllers;
use auth;
use App\User;
use App\Professeur;
use App\Models\Cours;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ProfesseurController;

class CoursController extends Controller
{
    
    public function index($user_id)
    {
       
        if(ProfesseurController::isTeacher($user_id)) {
            
            $teacher = ProfesseurController::selectTeacher($user_id);
             
            $courses =  Cours::where('professeur_id',$teacher->id)->get();
             
            return response()->json($courses);
        } else {
            return response()->json(['error' => 'user_is_not_teacher'], 404);
        }
    }
   
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        $token = JWTAuth::getToken();
        $playload = JWTAuth::getPayload($token)->toArray();
        
        if($playload['statut'] == 'teacher') {
            $validator = $this->validateCours($request);
            if($validator->fails()){
                    return response()->json($validator->errors()->toJson(), 400);
            }
             
            
            $cours = $this->createCours($request);

            //the teacher of the course
            $teacher = ProfesseurController::selectTeacher($playload['id']);
            $teacher->nbr_cours = $teacher->nbr_cours + 1;
            $teacher->save();
            $cours['professeur_id'] = $teacher->id;
            
            // store files

            $cours['document'] = $this->storeFiles($request, 'document','doc_name', 'doc_extension');;
            $cours['image_cours'] = $this->storeFiles($request, 'image_cours','image_name', 'image_extension');;

            $cours = Cours::create($cours);
            
            
            return response()->json(['success' => 'the_course_is_created','teacher_id' => $teacher->id], 201);
        } else {
            return response()->json(['error' => 'user_is_not_teacher'], 404);
        }
    }

    
    public function show($cours_id)
    {
        if( ! $course = Cours::find($cours_id))
            return response()->json(['error' => 'cours_not_found'],404);

        $teacher = Professeur::find($course->professeur_id);

        $user = User::find($teacher->id);
        $teacher_infos = [
            'nom' => $user->name,
            'prenom' => $user->prenom,
            'email' => $user->email,
            'mini_bio' => $user->mini_bio,
        ];

        return response()->json(['course' => $course,'teacher' => $teacher_infos]);
    }

   
    public function edit(Cours $cours)
    {
        //
    }

   
    public function update(Request $request, Cours $cours)
    {
        
    }

    
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
            'image_cours' => 'required',           
            ]);
    }
    protected function createCours(Request $request)
    {
        return [
            'titre' => $request->get('titre'),
            'description' =>$request->get('description'),
            'niveau' => $request->get('niveau'),
            'duree' => $request->get('duree'),
            'document' => '',
            'categorie' =>$request->get('statut'),
            'difficulte' =>$request->get('difficulte'),
            'objectif' =>$request->get('objectif'),
            'prerequis' =>$request->get('prerequis'),
            'image_cours' => '',
            'professeur_id' => '',
        ];
    }
    public static function storefiles(Request $request,$file,$file_name,$file_extension)
    {
    
        $file_decode = base64_decode($request->get($file));

        $file_name = $request->get($file_name);               //'image_cours','image_name', 'image_extension'
        $file_extension = $request->get($file_extension);

        $file_to_store = $file_name.'_'.time().'.'.$file_extension;

        //Storage::put($file_to_store, $file_decode);
        Storage::disk('local')->put($file_to_store, $file_decode);
        
        return $file_to_store;
    }

    public function allCourses()
    {
        return response()->json(['courses' => Cours::all()]);
    }
}
