<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Role;
use App\Organization;
use App\User;
use App\Patient;
use App\Therapist;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('dashboard');
    }

    public function getLoggedInUser()
    {
        if (Auth::check())
        {
            $user = Auth::user();
            $arr = $user->toArray();
        } else {
            $arr = "";
        }
        return $arr;
    }

    public function getOrgById(Request $request) {
        $orgId = $request->input("id");
        $org = Organization::find($orgId);
        return $org->toArray();
    }

    public function createNewTherapist() {
        $attributes = [
            "name" => "Ther 3",
            "email" => "ther3@mmm.com",
            "password" => bcrypt(1234)
        ];
        $role = Role::find(3);
        $therapist = new Therapist($attributes);
        $organization = Organization::find(3);
        $therapist->Organization()->associate($organization);
        $therapist->save();
        $therapist->attachRole($role);
        return $therapist->toArray();
    }

    public function createNewOrganization()
    {
        $args = [
            "name" => "clinic 2",
            "address" => "clinic 2 address",
            "phone" => "clinic 2 phone"
        ];
        $org = new Organization($args);
        $org->save();
        return $org->toArray();
    }

    public function createNewPatient() {
        $attributes = [
            "name" => "Patient 3"
        ];
        $patient = new Patient($attributes);
        $organization = Organization::find(3);
        $patient->Organization()->associate($organization);
        $patient->save();
        return $patient->toArray();
    }

    public function getTherapist()
    {
//        $user = Patient::find(15);
        $user = Therapist::find(13);
        return $user->toArray();
    }

    public function getPatient()
    {
        $patient = Patient::find(3);
        return $patient->toArray();

    }

}
