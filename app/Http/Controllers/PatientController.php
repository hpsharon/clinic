<?php

namespace App\Http\Controllers;

use App\Organization;
use App\Parent_Patient;
use App\Patient;
use Illuminate\Http\Request;

use App\Http\Requests;

class PatientController extends Controller
{
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
}
