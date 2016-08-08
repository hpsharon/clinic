<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::get('/dashboard', function () {
    return view('dashboard');
});


// Authentication routes...
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');
Route::get('/logout', 'Auth\AuthController@getLogout');
Route::auth();



Route::get('/home', 'HomeController@index');

Route::get('/getLoggedInUser', 'HomeController@getLoggedInUser');
Route::get('/getOrgById', 'HomeController@getOrgById');
Route::get('/createNewTherapist', 'HomeController@createNewTherapist');

Route::get('/createNewPatient', 'HomeController@createNewPatient');
Route::get('/getTherapist', 'HomeController@getTherapist');
Route::get('/getPatient', 'HomeController@getPatient');
Route::get('/createNewParent', 'HomeController@createNewParent');
Route::get('/createNewMeeting', 'HomeController@createNewMeeting');


//ORGANIZATION

Route::get('/createNewOrg', 'HomeController@createNewOrganization');
Route::get('/updateOrganization', 'HomeController@updateOrganization');
Route::get('/getAllOrgs', 'HomeController@getAllOrgs');
Route::get('/deleteOrg', 'HomeController@deleteOrg');
Route::get('/getAllUsersForOrg', 'HomeController@getAllUsersForOrg');
Route::get('/getOrgsForUser', 'HomeController@getOrgsForUser');


//USER
Route::get('/createNewUser', 'HomeController@createNewUser');

//Therapist

Route::get('/createNewTherapistForOrg', 'HomeController@createNewTherapistForOrg');
Route::get('/associateTherapistToSinglePatient', 'HomeController@associateTherapistToSinglePatient');
Route::get('/syncTherapistWithPatients', 'HomeController@syncTherapistWithPatients');

//in use
Route::get('/getTherapistById', 'HomeController@getTherapistById');
Route::get('/getTherapistsForOrgId', 'HomeController@getTherapistsForOrgId');

//PATIENT
Route::get('/createNewPatient', 'HomeController@createNewPatient');
Route::get('/updatePatient', 'HomeController@updatePatient');
Route::get('/getPatient', 'HomeController@getPatient');

//MEETING
Route::get('/createNewMeeting', 'HomeController@createNewMeeting');
Route::get('/getMeeting', 'HomeController@getMeeting');

//SERIES_MEETINGS
Route::get('/newSeriesForPatient', 'HomeController@newSeriesForPatient');
Route::get('/getMeetingsForSeriesId', 'HomeController@getMeetingsForSeriesId');