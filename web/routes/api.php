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


// Student Apis

Route::get('lescours', 'CoursController@allCourses');
//Route::post('')