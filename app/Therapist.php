<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Therapist extends User
{
    protected $table = 'users';
    protected $appends = ['patients', 'organization'];

    public function roles()
    {
        $table = "role_user";
        $foreignKey = "user_id";
        return $this->belongsToMany('App\Role', $table, $foreignKey);
    }

    public function patients()
    {
        return $this->belongsToMany("App\Patient");

    }

    public function getPatientsAttribute()
    {
        return $this->attributes['patients'] = $this->Patients()->get();
    }

}
