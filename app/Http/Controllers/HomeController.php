<?php

namespace App\Http\Controllers;

use App\Patient;
use App\Therapist;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests;
use Illuminate\Http\Request;
use App\Role;
use App\Organization;
use App\User;

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
            "name" => "Ther 1",
            "email" => "ther1@mmm.com",
            "password" => bcrypt(1234)
        ];
        $therapist = new Therapist($attributes);
        $org = Auth::user()->organization;
        $therapist->organization_id = 2;
        $therapist->save();
        return $therapist->toArray();
    }

    public function createNewOrganization()
    {
        $args = [
            "name" => "clinic 1",
            "address" => "clinic 1 address",
            "phone" => "clinic 1 phone"
        ];
        $org = new Organization($args);
        $org->save();
        return $org->toArray();
    }

    public function createNewPatient() {
        $attributes = [
            "name" => "Patient 1",
            "email" => "patient1@mmm.com",
            "password" => bcrypt(1234)
        ];
        $patient = new Patient($attributes);
        $patient->organization_id = 2;
        $patient->save();
        return $patient->toArray();
    }

}
