<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{

    protected $fillable = ['name'];
    protected $appends = ['therapist', 'organization'];
    protected $hidden = ['organization_id', "created_at", "deleted_at", "therapist_id"];

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

    public function getTherapistAttribute()
    {
        return $this->attributes['therapists'] = $this->Therapists()->get();
    }

    public function getOrganizationAttribute()
    {
        return $this->attributes['organization'] = $this->Organization()->get();
    }
}
