<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{

    protected $fillable = ['name'];
    protected $appends = ['therapist', 'organization', 'parents'];
    protected $hidden = ['organization_id', "created_at", "deleted_at", "therapist_id", "updated_at"];

    public function therapists()
    {
        $table = "patient_therapist";
        $foreignKey = "patient_id";
        $localKey = "therapist_id";
        return $this->belongsToMany("App\User", $table, $foreignKey, $localKey);
    }

    public function Organization()
    {
        return $this->belongsTo("App\Organization");
    }

    public function Parents()
    {
        return $this->hasMany("App\Parent_Patient");
    }

    public function getMeetings()
    {
        return $this->belongsToMany("App\Meeting")->get();
    }

    public function getTherapistAttribute()
    {
        return $this->attributes['therapists'] = $this->Therapists()->get();
    }

    public function getOrganizationAttribute()
    {
        return $this->attributes['organization'] = $this->Organization()->get();
    }

    public function getParentsAttribute()
    {
        return $this->attributes['parents'] = $this->Parents()->get();
    }

    public function getMeetingsAttribute()
    {
        return $this->attributes['meetings'] = $this->Meetings()->get();
    }
}
