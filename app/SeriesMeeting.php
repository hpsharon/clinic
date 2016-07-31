<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SeriesMeeting extends Model
{
    protected $fillable = ["num_of_meetings"];
    protected $hidden = [];


    public function Patient()
    {
        return $this->belongsTo("App\Patient");
    }

    public function Meetings()
    {
        return $this->hasMany("App\Meeting");
    }

    public function getMeetingsAttribute()
    {
        return $this->attributes['meetings'] = $this->Meetings()->get();
    }
}
