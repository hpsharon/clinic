<?php

namespace App\Http\Controllers;

use App\SeriesMeeting;
use Illuminate\Http\Request;
use App\Patient;

use App\Http\Requests;

class SeriesMeetingsController extends Controller
{
    public static function createNewSeriesForPatient($patientId, $numOfMeetings)
    {
        $seriesMeeting = new SeriesMeeting([
            "num_of_meetings" => $numOfMeetings
        ]);
        $seriesMeeting->save();
        $seriesMeeting->Patient()->associate(Patient::find($patientId));
        $seriesMeeting->save();
        return $seriesMeeting;
    }

    public static function getMeetingsForSeriesId($seriesId)
    {
        $sm = SeriesMeeting::find($seriesId);
        return $sm->Meetings()->get();
    }
}
