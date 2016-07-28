<?php

namespace App\Http\Controllers;

use App\Patient;
use App\Therapist;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class TherapistController extends Controller
{
    //TODO:: check permissions for operations
    /**
     * @param $arr_therapistDetails - array contains key-value user details
     * @param $orgId - The organization id to associate the therapist to
     * @return \App\User
     */
    public static function createNewTherapistForOrg($arr_therapistDetails, $orgId)
    {
        $therapistRoleId = 3;
        $user = UserController::createUserForOrgId($arr_therapistDetails, $orgId, $therapistRoleId);
        return $user;
    }

    /**
     * @param $therapistId - The therapist id to attach the patient to
     * @param $patientId - The patient id
     * @return mixed
     */
    public static function associateTherapistToSinglePatient($therapistId, $patientId)
    {
        $therapist = Therapist::find($therapistId);
        $removeOldRecords = false;
        $therapist->patients()->sync([$patientId], $removeOldRecords);
        $therapist->save();
        return $therapist;
    }

    /**
     * Deletes the old patients connection and ads new patients
     * @param $therapistId- The therapist id to attach the patient to
     * @param $arr_patientIds - array of patients to REPLACE with the old
     * @return mixed
     */
    public static function syncTherapistWithPatients($therapistId, $arr_patientIds)
    {
        $therapist = Therapist::find($therapistId);
        $removeOldRecords = true;
        $therapist->patients()->sync($arr_patientIds, $removeOldRecords);
        $therapist->save();
        return $therapist;
    }
}
