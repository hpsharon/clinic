<?php

namespace App\Http\Controllers;

use App\Meeting;
use App\Organization;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;

class MeetingController extends Controller
{
    /**
     * @param $starTime - timestamp
     * @param $endTime - timestamp
     * @param $orgId
     * @param $arr_therapist
     * @param $arr_patients
     * @return Meeting
     */
    public static function createNewMeeting($starTime, $endTime, $orgId, $arr_therapist, $arr_patients)
    {
        $meeting = new Meeting([
            "start_time" => Carbon::createFromTimestamp($starTime),
            "end_time" => Carbon::createFromTimestamp($endTime)
        ]);
        $meeting->save();
        $meeting->Organization()->associate(Organization::find($orgId));
        $meeting->Therapists()->sync($arr_therapist);
        $meeting->Patients()->sync($arr_patients);
        $meeting->save();
        return $meeting;
    }

    public static function getMeeting($meetingId)
    {
        $meeting = Meeting::find($meetingId);
        return $meeting;
    }
}
