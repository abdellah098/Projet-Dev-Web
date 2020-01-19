<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@authenticate');
Route::get('open', 'DataController@open');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::get('closed', 'DataController@closed');
});

// Prof Apis

Route::post('cours','CoursController@store');

Route::post('questions', 'QuizController@store');

Route::get('cours/mescours/{user_id}', 'CoursController@index');

Route::get('cours/{cours_id}', 'CoursController@show');

Route::post('cours/cours_a_jour', 'CoursController@getCourse');

Route::post('couRS/course_a_jour', 'CoursController@update');


// Student Apis

Route::post('lescours', 'CoursController@allCourses'); //retour tous les cours avec pagination paramétres keyword,page per_page 

Route::post('cours/inscription','EtudiantController@subscribe'); //insciption à un cours paramétre token, cours_id

Route::delete('cours/deinscription/{cours_id}', 'EtudiantController@unsubscribe');//deinsciption à un cours paramétre token, cours_id

Route::post('quiz/questions', 'QuizController@courseQuiz');// 1 return le quiz d'un cours paramétre cours_id

Route::post('/cours/cours_suivis', 'EtudiantController@myCourses');// 2 retourne tous les cours suivis par un etudiant paramétre : token 

Route::post('/user/informations','UserController@information'); // 3 retourne le mail,nom,prenom d'un utilisateur paramètre: token

Route::post('cours/cours_suivis/id', 'EtudiantController@myCoursesIds');//  4 retourne un array des id des cours suivis par un etudiant paramétre:token

Route::post('cours/valider_quiz', 'QuizController@validerQuiz');  // validation d'un quiz

