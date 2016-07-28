<?php

namespace App\Http\Controllers;

use App\Meeting;
use App\Parent_Patient;
use Carbon\Carbon;
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
    
    public function deleteOrg(Request $request) 
    {
        $orgId = $request->input("orgId");
        OrganizationController::deleteOrg($orgId);
    }
    
    public function getAllUsersForOrg(Request $request)
    {
        $orgId = $request->input("orgId");

        $users = OrganizationController::getAllUsersForOrg($orgId);
        return $users;
    }

    public function updateOrganization(Request $request)
    {
        $orgId = $request->input("orgId");
        $paramsToUpdate = $request->input("params");
        $org = OrganizationController::updateOrganization($orgId, $paramsToUpdate);
        return $org;
    }

    public function getAllOrgs()
    {
        $orgs = OrganizationController::getAllOrgs();
        return $orgs;
    }
    
    public function createNewUser(Request $request)
    {
        $orgId = $request->input("orgId");
        $roleId = $request->input("roleId");
        $userDetails = $request->input("userDetails");
        UserController::createUserForOrgId($userDetails, $orgId, $roleId);
    }

    public function createNewTherapistForOrg(Request $request) {
        $userDetails = $request->input("userDetails");
        $orgId = $request->input("orgId");
        $therapist = TherapistController::createNewTherapistForOrg($userDetails, $orgId);
        return $therapist;
    }
    
    public function associateTherapistToSinglePatient(Request $request)
    {
        $therapistId = $request->input("therapistId");
        $patientId = $request->input("patientId");
        $therapist = TherapistController::associateTherapistToSinglePatient($therapistId, $patientId);
        return $therapist;
    }
    
    public function syncTherapistWithPatients(Request $request)
    {
        $therapistId = $request->input("therapistId");
        $patientId = $request->input("patientId");
        $therapist = TherapistController::syncTherapistWithPatients($therapistId, $patientId);
        return $therapist;
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
        $patient = Patient::find(2);
        return $patient->getMeetings();

    }

    public function createNewParent()
    {
        $parent = new Parent_Patient([
            "name" => "parent 2 for patient 2",
            "email" => "email",
            "phone" => '050-556232565'
        ]);
        $patient = Patient::find(2);
        $parent->Patient()->associate($patient);
        $parent->save();
        return $parent->toArray();
    }

    public function createNewMeeting()
    {
        $meeting = new Meeting([
            "start_time" => Carbon::now(),
            "end_time" => Carbon::now()->addMinute(50),
            "goals" => "goals meeting 2",
            "tools" => "tools meeting 2",
            "description" => "description meeting 2",
            "remarks" => "remarks meeting 2",
        ]);
        $organization = Organization::find(2);
        $meeting->Organization()->associate($organization);
        $meeting->save();
        return $meeting->toArray();
    }

    public function getMeeting()
    {
        $meeting = Meeting::find(1);
        return $meeting->toArray();
    }

}
