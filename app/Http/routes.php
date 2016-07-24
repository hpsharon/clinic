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
Route::auth();

Route::get('/home', 'HomeController@index');

Route::get('/getLoggedInUser', 'HomeController@getLoggedInUser');
Route::get('/getOrgById', 'HomeController@getOrgById');
Route::get('/createNewTherapist', 'HomeController@createNewTherapist');
Route::get('/createNewOrganization', 'HomeController@createNewOrganization');
