<?php

namespace App\Http\Controllers;

use App\Meeting;
use App\Parent_Patient;
use App\SeriesMeeting;
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

    public function getOrgsForUser()
    {
        $user = Auth::user();
        $org = $user->Organization()->get()->toArray();
        if ($user->hasRole("SYSTEM_ADMIN")) {
            return OrganizationController::getAllOrgs();
        } else {
            return $org;
        }
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

    public function createNewPatient(Request $request) {
        $data = $request->input("userDetails");
        $arr_userDetails = [
            "name" => $data['name']
        ];
        $organizationId = $data['organizationId'];
        $arr_therapistIds = $data['arr_therapistIds'];
        $arr_parents = $data['parents'];
        $patient = PatientController::createNewPatient($arr_userDetails, $organizationId, $arr_therapistIds, $arr_parents);
        return $patient;
    }
    
    public function updatePatient(Request $request)
    {
        $data = $request->input("userDetails");
        $patientId = $data['patientId'];
        $arr_userDetails = [
            "name" => $data['name']
        ];
        $arr_therapistIds = array_key_exists('arr_therapistIds', $data) ? $data['arr_therapistIds'] : [];
        $arr_parents = $data['parents'];
        $patient = PatientController::updatePatient($patientId, $arr_userDetails, $arr_therapistIds, $arr_parents);
        return $patient;
    }

    public function getPatient(Request $request)
    {
        $patientId = $request->input("id");
        return PatientController::getPatient($patientId);
    }

    public function createNewMeeting(Request $request)
    {
        $startTime = $request->input("startTime");
        $endTime = $request->input("endTime");
        $orgId = $request->input("orgId");
        $arr_patients = $request->input("arr_patients");
        $arr_therapists = $request->input("arr_therapists");
        $meeting = MeetingController::createNewMeeting($startTime, $endTime, $orgId, $arr_therapists, $arr_patients);
        return $meeting;
    }

    public function newSeriesForPatient(Request $request)
    {
        $patientId = $request->input("patientId");
        $numOfMeetings = $request->input("numOfMeetings");
        $sm = SeriesMeetingsController::createNewSeriesForPatient($patientId, $numOfMeetings);
        return $sm;
    }

    public function getMeetingsForSeriesId(Request $request)
    {
        $smId = $request->input("id");
        $sm = SeriesMeetingsController::getMeetingsForSeriesId($smId);
        return $sm;
    }

    public function getTherapist()
    {
//        $user = Patient::find(15);
        $user = Therapist::find(13);
        return $user->toArray();
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

    public function getMeeting(Request $request)
    {
        $meetingId = $request->input("id");
        return MeetingController::getMeeting($meetingId)->toArray();
    }

}
