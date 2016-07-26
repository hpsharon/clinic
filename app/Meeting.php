<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Meeting extends Model
{
    //
    protected $dates = ['start_time', 'end_time'];
    protected $fillable = ['start_time', 'end_time', 'goals','tools', 'description','remarks' ];
    protected $hidden = ['created_at', 'organization_id', 'updated_at'];
    protected $appends = ['patients', 'therapists'];

    public function Organization()
    {
        return $this->belongsTo("App\Organization");
    }

    public function Patients()
    {
        return $this->belongsToMany("App\Patient");
    }

    public function Therapists()
    {
        $table = "meeting_therapist";
        $foreignKey = "meeting_id";
        $otherKey = "therapist_id";
        return $this->belongsToMany("App\User", $table, $foreignKey, $otherKey);
    }

    public function getPatientsAttribute()
    {
        return $this->attributes['patients'] = $this->Patients()->get();
    }

    public function getTherapistsAttribute()
    {
        return $this->attributes['therapists'] = $this->Therapists()->get();
    }

}
