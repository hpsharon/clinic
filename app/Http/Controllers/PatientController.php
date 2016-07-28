<?php

namespace App\Http\Controllers;

use App\Organization;
use App\Parent_Patient;
use App\Patient;
use Illuminate\Http\Request;

use App\Http\Requests;

class PatientController extends Controller
{
    /**
     * @param $patientDetails
     * @param $orgId
     * @param $arr_therapistIds
     * @param $arr_parents
     * @return Patient
     */
    public static function createNewPatient($patientDetails, $orgId, $arr_therapistIds, $arr_parents)
    {
        $patient = new Patient($patientDetails);
        $patient->save();
        
        foreach ($arr_parents as $parent){
            $tempParent = new Parent_Patient($parent);
            $patient->parents()->save($tempParent);
        }
        $patient->Organization()->associate(Organization::find($orgId));
        $patient->therapists()->sync($arr_therapistIds);
        $patient->save();
        return $patient;
    }


    /**
     * @param $patientId
     * @param $arr_details
     * @param $arr_therapistIds
     * @param $arr_parents
     * @return mixed
     */
    public static function updatePatient($patientId, $arr_details, $arr_therapistIds, $arr_parents)
    {
        $patient = Patient::find($patientId);
        $patient->therapists()->sync($arr_therapistIds);
        foreach($arr_details as $key => $value) {
            $patient[$key] = $value;
        }
        foreach($arr_parents as $parent) {
            $parentId = $parent['parentId'];
            unset($parent['parentId']);
            ParentController::updateParent($parentId, $parent);
        }
        $patient->save();
        return $patient;
    }
}
